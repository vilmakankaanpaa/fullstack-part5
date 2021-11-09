import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = ({ target }) => setNewTitle(target.value)
  const handleAuthorChange = ({ target }) => setNewAuthor(target.value)
  const handleUrlChange = ({ target }) => setNewUrl(target.value)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
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
}

export default BlogForm