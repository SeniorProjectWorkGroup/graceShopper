import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <div id="Greeting" className="text-white cabin m-5">
        <h3>Welcome, {email}</h3>
      </div>
      <img
        id="home-sword"
        src="http://www.stickpng.com/assets/images/580b585b2edbce24c47b244d.png"
      />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    name: state.user.name
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
