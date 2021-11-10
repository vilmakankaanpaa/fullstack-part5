import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('form receives input correctly', () => {

  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog}/>
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Blog Title' }
  })
  fireEvent.change(author, {
    target: { value: 'New Author' }
  })
  fireEvent.change(url, {
    target: { value: 'www.url.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Blog Title' )
  expect(createBlog.mock.calls[0][0].author).toBe('New Author' )
  expect(createBlog.mock.calls[0][0].url).toBe('www.url.com' )

})