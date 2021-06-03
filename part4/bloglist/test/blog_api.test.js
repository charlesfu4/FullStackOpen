const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const password = 'iamtim'
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username: 'Tim',
    passwordHash
  })
  await user.save()
  await Blog.deleteMany({})
  const existedUsers = await helper.usersInDb()
  for(let blog of helper.initialBlogs){
    let blogObj = new Blog({
      ...blog,
      user: existedUsers[0]._id
    })
    await blogObj.save()
  }
})

describe('when there is initially some notes saved', () => {
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
})

describe('addition of new blogs with existing user', () => {
  test('add a blog post by POST and the number of total blogs increase by one', async () => {
    const user = {
      username: 'Tim',
      password: 'iamtim'
    }

    const loginRes = await api
      .post('/api/login')
      .send(user)
      .expect(200)

    const token = loginRes.body.token

    const newBlog = {
      title:'dog is a good dog',
      author: 'Martin',
      url: 'www.king.com',
      likes: 999,
    }

    await api
      .post('/api/blogs')
      .set({ 'Authorization': `bearer ${token}` })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const endBlog = await helper.blogsInDb()
    expect(endBlog).toHaveLength(helper.initialBlogs.length+1)

    const title = endBlog.map(blog => blog.title)
    expect(title).toContain('dog is a good dog')
  })

  test('like will be default set to 0', async () => {
    const user = {
      username: 'Tim',
      password: 'iamtim'
    }

    const loginRes = await api
      .post('/api/login')
      .send(user)
      .expect(200)

    const token = loginRes.body.token

    const newBlog = {
      title:'Blog without likes is new',
      author: 'Dimono',
      url: 'www.kobe.com',
    }

    await api
      .post('/api/blogs')
      .set({ 'Authorization': `bearer ${token}` })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const endBlog = await helper.blogsInDb()
    expect(endBlog[endBlog.length-1].likes).toBe(0)
  })

  test('blog missing title and url response code 400', async () => {
    const user = {
      username: 'Tim',
      password: 'iamtim'
    }

    const loginRes = await api
      .post('/api/login')
      .send(user)
      .expect(200)

    const token = loginRes.body.token

    const newBlog = {
      author: 'Dimono',
    }

    await api
      .post('/api/blogs')
      .set({ 'Authorization': `bearer ${token}` })
      .send(newBlog)
      .expect(400)

    const endBlog = await helper.blogsInDb()
    expect(endBlog).toHaveLength(helper.initialBlogs.length)
  })
  test('add return 401 when token not provided', async () => {
    const newBlog = {
      title:'dog is a good dog',
      author: 'Martin',
      url: 'www.king.com',
      likes: 999,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const endBlog = await helper.blogsInDb()
    expect(endBlog).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const user = {
      username: 'Tim',
      password: 'iamtim'
    }
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    const loginRes = await api
      .post('/api/login')
      .send(user)
      .expect(200)

    const token = loginRes.body.token

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ 'Authorization' : `bearer ${token}` })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
  test('delete return 401 when token not provided', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )
  })
})

describe('update of a note', () => {
  test('update likes of a specific blog post', async () => {
    const user = {
      username: 'Tim',
      password: 'iamtim'
    }

    const loginRes = await api
      .post('/api/login')
      .send(user)
      .expect(200)

    const token = loginRes.body.token

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const blogId = blogToUpdate.id
    const updatedblog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 100,
      user: user,
    }

    await api
      .put(`/api/blogs/${blogId}`)
      .set({ 'Authorization': `bearer ${token}` })
      .send(updatedblog)

    const endBlog = await helper.blogsInDb()
    expect(endBlog[0].likes).toBe(100)
  })
  test('update return 401 when token not provided', async () => {
    const usr = await helper.usersInDb()[0]

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const blogId = blogToUpdate.id
    const updatedblog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 100,
      user: usr
    }

    await api
      .put(`/api/blogs/${blogId}`)
      .send(updatedblog)
      .expect(401)
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )
  })
})

afterAll(() => {
  mongoose.connection.close()
})