import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import BlogAddForm from '../../components/BlogAddForm'

test('<BlogAddForm /> calls the event handler it received as props with the right details when a new blog is called', () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogAddForm addBlog={ addBlog }/>
  )

  const form = component.container.querySelector('form')

  const titleInput = component.container.querySelector('input[name="title"]')
  const authorinput = component.container.querySelector('input[name="author"]')
  const urlInput = component.container.querySelector('input[name="url"]')

  fireEvent.change(titleInput, {
    target: { value: 'This is a mock title II' }
  })
  fireEvent.change(authorinput, {
    target: { value: 'author tester' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'http://testurl.com' }
  })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('This is a mock title II' )
  expect(addBlog.mock.calls[0][0].author).toBe('author tester' )
  expect(addBlog.mock.calls[0][0].url).toBe('http://testurl.com' )
})
