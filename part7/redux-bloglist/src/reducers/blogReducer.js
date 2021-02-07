import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOG',
      data: blogs
    })
  }
}

export const createBlog = (blogObj) => {
  return async dispatch => {
    try{
      const newBlog = await blogService.create(blogObj)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
    } catch(exception){
      return exception
    }
  }
}

export const delBlog = (id) => {
  return async dispatch => {
    try{
      await blogService.remove(id)
      const remainedBlogs = await blogService.getAll()
      dispatch({
        type: 'DEL_BLOG',
        data: remainedBlogs 
      })
    } catch(exception){
      return exception
    }
  }
}

export const updateBlog = (newBlog, id) => {
  return async dispatch => {
    try{
      await blogService.update(newBlog, id)
      const updatedBlogs = await blogService.getAll() 
      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlogs
      })
    } catch(exception){
      return exception
    }
  }
} 

const reducer = (state=[], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOG':
      return action.data
    case 'DEL_BLOG':
      return action.data 
    case 'UPDATE_BLOG':
      return action.data
    default:
      return state
  }
}

export default reducer