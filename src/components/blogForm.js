import React from 'react'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = (event) => {
    event.preventDefault()
      const blogObject = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }
      this.setState({
        title: '',
        author: '',
        url: ''
      })
      this.props.handleSubmit(blogObject)
}

  render() {
    return (
      <div>
        <h2>Add new Blog</h2>

        <form onSubmit={this.addBlog}>
          <div>
            Title
          <input
              name='title'
              value={this.state.title}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            Author
          <input
              name='author'
              value={this.state.author}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            URL
          <input
              name='url'
              value={this.state.url}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button>Save</button>
        </form>
      </div>
    )
  }
}

export default BlogForm