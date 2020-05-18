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
  beforeEach(() => {
    component = render(<Blog user={user} blog={sampleBlog} />)
  })

  test('renders blog title and author', () => {
    expect(component.getByText('testblogtitle by testblogauthor')).toBeDefined()
  })

})
