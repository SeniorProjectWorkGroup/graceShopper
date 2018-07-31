import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers, destroyUser} from '../../store/userListReducer'
import UserListing from './UserListing'
import {Oops} from '../Oops'

class AdminUserManagement extends Component {
  async componentDidMount() {
    try {
      await this.props.getUsers()
    } catch (err) {
      console.log('error', err)
      this.props.history.push('/home')
    }
  }

  deleteClicked = async targetId => {
    this.props.deleteUser(targetId)
  }
  render() {
    if (this.props.currentUser.role !== 'ADMIN') {
      return <Oops />
    }
    return (
      <div>
        <h3> Users </h3>
        <ul>
          {this.props.userList.map(user => {
            if (user.id !== this.props.currentUser.id)
              return (
                <UserListing
                  user={user}
                  deleteClicked={this.deleteClicked}
                  key={user.id}
                />
              )
            else return null
          })}
        </ul>
      </div>
    )
  }
}

const mapState = state => ({
  userList: state.userList,
  currentUser: state.user
})

const mapDispatch = dispatch => ({
  getUsers: () => dispatch(fetchUsers()),
  deleteUser: deleteId => dispatch(destroyUser(deleteId))
})

export default connect(mapState, mapDispatch)(AdminUserManagement)
