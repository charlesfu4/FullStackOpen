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

const reducer = (state=[], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOG':
      return action.data
    default:
      return state
  }
}

export default reducer