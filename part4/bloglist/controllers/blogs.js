const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username:1, name:1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog) response.json(blog)
  else response.status(404).end()
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog) response.json(blog.comments)
  else response.status(404).end()
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if(!request.token){
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
    user: user
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  if(!request.token){
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = await Blog.findById(request.params.id)
  const createdUserId = blog.user.toString()
  if(user.id.toString() === createdUserId){
    await Blog.findByIdAndRemove(request.params.id)
    user.blogs = user.blogs.filter(id => id.toString() !== request.params.id)
    await user.save()
    response.status(204).end()
  }
  else{
    return response.status(403).json({ error: 'not the correct user' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  if(!request.token){
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
    user: body.user.id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,
    blog,
    { new : true, runValidators : true }
  ).populate('user', { username:1, name:1 })
  response.json(updatedBlog)
})

module.exports = blogsRouter