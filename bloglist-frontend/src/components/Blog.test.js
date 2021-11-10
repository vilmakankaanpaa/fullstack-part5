import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders only teaser content', () => {

  const mockOnRemove = jest.fn()
  const mockOnLike = jest.fn()

  const testUser = {
    username: 'someuser'
  }

  const blog = {
    title: 'Some title',
    author: 'Someone Else',
    url: 'www.blogurl.com',
    likes: 2,
    user: testUser
  }


  const component = render(
    <Blog
      blog={blog}
      currentUser={testUser}
      onRemove={mockOnRemove}
      onLike={mockOnLike}
    />
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'Some title'
  )

  expect(component.container).toHaveTextContent(
    'Someone Else'
  )

  expect(component.container).not.toHaveTextContent(
    'www.blogurl.com'
  )

  const divTeaser = component.container.querySelector('.teaserContent')
  expect(divTeaser).toBeDefined()

})

test('blog url and likes are shown when button is clicked', () => {

  const mockOnRemove = jest.fn()
  const mockOnLike = jest.fn()

  const testUser = {
    username: 'someuser'
  }

  const blog = {
    title: 'Some title',
    author: 'Someone Else',
    url: 'www.blogurl.com',
    likes: 2,
    user: testUser
  }


  const component = render(
    <Blog
      blog={blog}
      currentUser={testUser}
      onRemove={mockOnRemove}
      onLike={mockOnLike}
    />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'www.blogurl.com'
  )

  expect(component.container).toHaveTextContent(
    'likes 2'
  )

})

test('event handler is called twice when blog is liked twice', () => {

  const mockOnRemove = jest.fn()
  const mockOnLike = jest.fn()

  const testUser = {
    username: 'someuser'
  }

  const blog = {
    title: 'Some title',
    author: 'Someone Else',
    url: 'www.blogurl.com',
    likes: 2,
    user: testUser
  }

  const component = render(
    <Blog
      blog={blog}
      currentUser={testUser}
      onRemove={mockOnRemove}
      onLike={mockOnLike}
    />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockOnLike.mock.calls).toHaveLength(2)

})
