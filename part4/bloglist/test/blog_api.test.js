const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for(let blog of helper.initialBlogs){
    let blogObj = new Blog(blog)
    await blogObj.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('_id is defined as id in the bloglist', async () => {
  const allBlog = await helper.blogsInDb()
  const inspectBlog = allBlog[0]
  expect(inspectBlog.id).toBeDefined()
})

test('add a blog post by POST and the number of total blogs increase by one', async () => {
  const newBlog = {
    title:'dog is a good dog',
    author: 'Martin',
    url: 'www.king.com',
    likes: 999
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const endBlog = await helper.blogsInDb()
  expect(endBlog).toHaveLength(helper.initialBlogs.length+1)

  const title = endBlog.map(blog => blog.title)
  expect(title).toContain('dog is a good dog')
})

test('like will be default set to 0', async () => {
  const newBlog = {
    title:'Blog without likes is new',
    author: 'Dimono',
    url: 'www.kobe.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const endBlog = await helper.blogsInDb()
  expect(endBlog[endBlog.length-1].likes).toBe(0)
})

test('blog missing title and url response code 400', async () => {
  const newBlog = {
    author: 'Dimono',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const endBlog = await helper.blogsInDb()
  expect(endBlog).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})