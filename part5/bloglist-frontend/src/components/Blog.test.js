import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const testBlogs = {
      title:'test-title',
      author:'test-author',
      url:'test-url',
      likes: 911911911
    }
    component = render(
      <Blog blog={testBlogs} handleUpdateOnClick={jest.fn()} />
    )
  })
  test('renders content with only title and author by default', () => {

    const div = component.container.querySelector('.togglableContent div:not([style*="display: none;"])')
    // console.log(prettyDOM(div))
    expect(div).toHaveTextContent('test-title')
    expect(div).toHaveTextContent('test-author')
    expect(div).not.toHaveTextContent('test-url')
    expect(div).not.toHaveTextContent(911911911)
  })

  test('renders content all blogs detail after clicking view button', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent div:not([style*="display: none;"])')
    // console.log(prettyDOM(div))
    expect(div).toHaveTextContent('test-title')
    expect(div).toHaveTextContent('test-author')
    expect(div).toHaveTextContent('test-url')
    expect(div).toHaveTextContent(911911911)
  })
})