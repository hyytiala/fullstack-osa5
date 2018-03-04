import React from 'react'
import PropTypes from 'prop-types'

class TogglableBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  addLike = (event) => {
    event.preventDefault()
    const id = this.props.blog.id
    const blogObject = {
      title: this.props.blog.title,
      author: this.props.blog.author,
      url: this.props.blog.url,
      likes: this.props.blog.likes + 1,
      user: this.props.blog.user._id
    }
    console.log(id)
    this.props.handleLike(blogObject, id)
  }

  delete = (event) => {
    if (window.confirm(`Delete ${this.props.blog.title} ?`)) {
      event.preventDefault()
      const id = this.props.blog.id
      this.props.handleRemove(id)
    }
  }


  render() {
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    var showRemove = false
    if (!this.props.blog.user) {
      showRemove = true
    } else if (this.props.blog.user.username === this.props.username) {
      showRemove = true
    }

    return (
      <div className="content">
        <div onClick={this.toggleVisibility} className="textButton">
          {this.props.blog.title}: {this.props.blog.author}
        </div>
        <div style={showWhenVisible} className="hideBlock">
            <ul>
              <li>
                <a href={this.props.blog.url}>{this.props.blog.url}</a>
              </li>
              <li>
                likes: {this.props.blog.likes} <button onClick={this.addLike}>like</button>
              </li>
              <li>
                Added by: {this.props.blog.user ? this.props.blog.user.name : "anonymous"}
              </li>

              {showRemove ? <li><button onClick={this.delete}>Delete</button></li> : ''}
            </ul>
        </div>
      </div>
    )
  }
}

TogglableBlog.propTypes = {
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default TogglableBlog