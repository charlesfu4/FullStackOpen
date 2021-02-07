import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
  notiErr: notificationReducer,
  blogs: blogReducer,
  loginUser: loginReducer,
  users: usersReducer 
})

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )  
)

export default store