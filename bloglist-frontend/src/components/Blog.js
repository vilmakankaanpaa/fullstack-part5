import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onLike, onRemove, currentUser }) => {
  const [visible, setVisible] = useState(false)


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButton = () => (
    <>
      <br/><button onClick={onRemove}>Remove</button>
    </>
  )

  const blogTeaser = () => (
    <div className='teaserContent'>
      {blog.title} by {blog.author} <button onClick={toggleVisibility}>view</button>
    </div>
  )

  const blogDetails = () => (
    <div className='detailedContent'>
      {blog.title} <button onClick={toggleVisibility}>hide</button>
      <br/> {blog.url}
      <br/> likes {blog.likes} <button onClick={onLike}>like</button>
      <br/> {blog.user.username}
      { (currentUser.username===blog.user.username) && removeButton() }
    </div>
  )

  return (
    <div style={blogStyle}>
      { !visible
        ? blogTeaser()
        : blogDetails()
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
}

export default Blog