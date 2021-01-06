const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'James Ting',
    url: 'www.google.com',
    likes: 8,
  },
  {
    title: 'Cool guys dont eat',
    author: 'Hou Ting',
    url: 'www.dog.com',
    likes: 5,
  },
  {
    title: 'The secret of pasta',
    author: 'James Chao',
    url: 'www.cat.com',
    likes: 1,
  }
]

const initialUsers = [
  {
    username: 'root',
    name: 'SuperPower',
    password: 'admin'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'Ben', url: 'www.yahoo.com', likes: 7 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog)
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user)
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}