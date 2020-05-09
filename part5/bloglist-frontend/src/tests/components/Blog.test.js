import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from '../../components/Blog'

describe('<Blog />', () => {

  const user = {
    name: 'testname',
    username: 'testusername'
  }

  const sampleBlog = {
    title: 'testblogtitle',
    author: 'testblogauthor',
    url: 'test blog url',
    likes: 3,
    user: {
      name: 'testname',
      username: 'testusername'
    }
  }

  let component
  let handleUpdate, handleLike, handleRemove
  beforeEach(() => {
    handleUpdate = jest.fn()
    handleLike   = jest.fn()
    handleRemove = jest.fn()
    component = render(
      <Blog
        user={user}
        blog={sampleBlog}
        handleUpdate={handleUpdate}
        handleLike={handleLike}
        handleRemove={handleRemove}
      />
    )
  })

  test('renders blog title and author', () => {
    expect(component.getByText('testblogtitle by testblogauthor')).toBeDefined()
  })

  test('blog details are hidden by default', () => {
    expect(component.container.querySelector('.blogDetails')).toHaveStyle('display: none')
  })

  test('when show button is clicked, blog details are visible', () => {
    const button = component.container.querySelector('.blogHeader button')
    fireEvent.click(button)

    expect(component.container.querySelector('.blogDetails')).not.toHaveStyle('display: none')
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const button = component.container.querySelector('.blogLikes button')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
