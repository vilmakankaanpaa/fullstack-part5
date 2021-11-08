import React from 'react'

const BlogForm = ({
  addBlog,
  newTitle,
  newAuthor,
  newUrl,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => (
  <>
    <h2>Create new</h2>
    <form onSubmit={addBlog}>
      Title:
      <input
        value={newTitle}
        onChange={handleTitleChange}
      /><br/>
      Author:
      <input
        value={newAuthor}
        onChange={handleAuthorChange}
      /><br/>
      Url:
      <input
        value={newUrl}
        onChange={handleUrlChange}
      /><br/>       
      <button type="create">save</button>
    </form>  
  </>
)

export default BlogForm