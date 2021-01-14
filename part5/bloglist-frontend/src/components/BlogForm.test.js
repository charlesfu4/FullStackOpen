
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component
  const mockHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <BlogForm createBlog={mockHandler} />
    )
  })

  test('the form calls the event handler it received as props with the right details ', () => {
    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(inputTitle, {
      target: { value: 'test-title' }
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'test-author' }
    })
    fireEvent.change(inputUrl, {
      target: { value: 'test-url' }
    })

    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('test-title')
    expect(mockHandler.mock.calls[0][0].author).toBe('test-author')
    expect(mockHandler.mock.calls[0][0].url).toBe('test-url')
  })
})