import React from 'react'
import Notification from './components/Notification'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/blogForm'
import Togglable from './components/Togglable'
import TogglableBlog from './components/TogglableBlog'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: null,
      notification: null,
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  sortList(a, b) {
    return b.likes - a.likes
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = async (blog) => {
    try {
      const savedBlog = await blogService.create(blog)
      this.setState({
        blogs: this.state.blogs.concat(savedBlog),
        notification: `Blog ${savedBlog.title} by ${savedBlog.author} added`
      })
      this.blogForm.toggleVisibility()
      setTimeout(() => {
        this.setState({ notification: null })
      }, 2000)
    } catch (error) {
      console.log(error)
      this.setState({
        error: 'Something went wrong'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 2000)
    }

  }

  removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      this.setState({
        blogs: this.state.blogs.filter(blog => blog.id !== id)
      })
    } catch (error) {
      console.log(error)
      this.setState({
        error: 'Something went wrong'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 2000)
    }
  }

  addLike = async (blog, id) => {
    try {
      const updatedBlog = await blogService.update(id, blog)
      this.setState({
        blogs: this.state.blogs.map(blog => blog.id !== id ? blog : updatedBlog)
      })
    } catch (error) {
      console.log(error)
      this.setState({
        error: 'Something went wrong'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 2000)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({
        username: '',
        password: '',
        notification: 'User logged in',
        user
      })
      setTimeout(() => {
        this.setState({ notification: null })
      }, 2000)
    } catch (exception) {
      this.setState({
        error: 'Wrong username or password',
        password: ''
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 2000)
    }
  }

  logOut = () => {
    window.localStorage.removeItem('loggedUser')
    this.setState({
      user: null
    })
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>Log in please</h2>

        <form onSubmit={this.login}>
          <div>
            Username
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            Password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button>log in</button>
        </form>
      </div>
    )

    const blogForm = () => (
      <div>
        <div>
          <Togglable buttonLabel='Add new Blog' ref={component => this.blogForm = component}>
            <BlogForm
              handleSubmit={this.addBlog}
            />
          </Togglable>
        </div>
        <div>
          <h2>blogs</h2>
          {this.state.blogs.sort(this.sortList).map(blog =>
            <TogglableBlog
              key={blog.id}
              blog={blog}
              handleLike={this.addLike}
              handleRemove={this.removeBlog}
              username={this.state.user.username}
            />
          )}
        </div>
      </div>
    )

    return (
      <div>
        <Error message={this.state.error} />
        <Notification message={this.state.notification} />
        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in <button onClick={this.logOut}>Log Out</button></p>
            {blogForm()}
          </div>
        }
      </div>
    );
  }
}

export default App;
