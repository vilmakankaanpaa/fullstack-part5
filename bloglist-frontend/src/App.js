import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const viewMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const viewErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      viewMessage('Login succeeded')
    } catch (exception) {
      viewErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(
      'loggedBlogappUser'
    )
    blogService.setToken('')
    setUser(null)
    viewMessage('You´re logged out')
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.create(blogObject)
      //setBlogs(blogs.concat(returnedBlog))
      const blogs = await blogService.getAll()
      setBlogs( blogs )
      viewMessage('New blog added.')
    }
    catch (exception) {
      viewErrorMessage('Could not add blog: missing details.')
      console.log(exception)
    }
  }

  const addLike = async (blogObject) => {
    try {
      const updatedBlog = { ...blogObject, likes: blogObject.likes + 1 }
      const returnedBlog = await blogService.addLike(updatedBlog)
      setBlogs(blogs.map(blog =>
        blog.id !== blogObject.id ? blog : returnedBlog))
      viewMessage('Your like was saved!')
    } catch (error) {
      viewErrorMessage('Like could not be added.')
    }
  }

  const removeBlog = async (blogObject) => {
    if (!window.confirm(
      `Are you sure you want to remove blog '${blogObject.title}' 
      by ${blogObject.author}?`)) {
      return
    }
    try {
      const response = await blogService.remove(blogObject)
      console.log(response)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      viewMessage(`Blog by ${blogObject.author} removed.`)
    } catch (error) {
      viewErrorMessage('Blog could not be deleted.')
    }
  }

  const loginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      passsword={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
    />
  )

  const blogForm = () => (
    <Togglable buttonLabel='Create blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  const logoutView = () => (
    <div>
      <p>{user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} />
      <ErrorMessage message={errorMessage} />
      { user === null ?
        loginForm() :
        logoutView()
      }
      { user !== null && blogForm() }
      { blogs
        .sort((a,b) => b.likes-a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            onLike={() => addLike(blog)}
            onRemove={() => removeBlog(blog)}
            currentUser={user}
          />
        )
      }
    </div>
  )
}

export default App