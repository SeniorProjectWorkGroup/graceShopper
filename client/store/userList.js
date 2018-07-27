import axios from 'axios'

//ACTION TYPES
const ActionTypes = {
  DELETE_USER: 'DELETE_USER',
  EDIT_USER: 'EDIT_USER',
  GET_USERS: 'GET_USERS'
}

//ACTION CREATORS
const deleteUser = deletedId => ({
  type: ActionTypes.DELETE_USER,
  deletedId
})
const editUser = editedUser => ({
  type: ActionTypes.DELETE_USER,
  editedUser
})
const getUsers = userList => ({
  type: ActionTypes.GET_USERS,
  userList
})

export const destroyUser = id => async dispatch => {
  try {
    await axios.delete(`/api/users/${id}`)
    dispatch(deleteUser(id))
  } catch (err) {
    console.error(err)
  }
}
export const putUser = id => async dispatch => {
  try {
    const updatedUser = await axios.put(`/api/users/${id}`)
    dispatch(editUser(updatedUser))
  } catch (err) {
    console.error(err)
  }
}
export const fetchUsers = () => async dispatch => {
  try {
    const userList = await axios.get(`/api/users/`)
    dispatch(getUsers(userList))
  } catch (err) {
    console.log(err)
  }
}
const defaultUserList = []

export default function(userListState = defaultUserList, action) {
  switch (action.type) {
    case ActionTypes.DELETE_USER:
      return action.userListState.filter(user => {
        return user.id !== action.deletedId
      })
    case ActionTypes.EDIT_USER: {
      return action.userListState.map(user => {
        if (user.id === action.editedUser.id) return action.editedUser
        else return user
      })
    }
    case ActionTypes.GET_USERS: {
    }
    default:
      return userListState
  }
}
