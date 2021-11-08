import React, { useState } from 'react'

const Blog = ({blog, onLike, onRemove, currentUser}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

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

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
          {blog.title} by {blog.author} <button onClick={toggleVisibility}>view</button> 
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>hide</button> 
        <br/> {blog.url}
        <br/> likes {blog.likes} <button onClick={onLike}>like</button>
        <br/> {blog.user.username}

        { (currentUser.username===blog.user.username) && removeButton() }
      </div> 
    </div> 
  )
}

export default Blog