import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, prettyDOM } from '@testing-library/react'
import Blog from './Blog'

test('renders content with only title and author', () => {
  const testBlogs = {
    title:'test-title',
    author:'test-author',
    url:'test-url',
    likes: 911911911
  }

  const component = render(
    <Blog blog={testBlogs} handleUpdateOnClick={jest.fn()} />
  )

  const div = component.container.querySelector('.togglableContentDefault')
  console.log(prettyDOM(div))
  expect(div).toHaveTextContent('test-title')
  expect(div).toHaveTextContent('test-author')
  expect(div).not.toHaveTextContent('test-url')
  expect(div).not.toHaveTextContent(911911911)
})