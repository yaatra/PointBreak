import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { loadUserData } from '../store'
//loadUserData
//user name and user avatar

// const Message = () => {
class Message extends Component {
  render() {
   const {message} = this.props
   const user = message.user
   console.log("PROPS", this.props)
   //console.log("*user*", user)
   //console.log("---message---", message)
    return (
 
      <li className="media">
        <div className="media-body">
          <h4 className="media-heading">
            {' '}
            {moment(message.createdAt).format(
              'MMMM Do YYYY, h:mm:ss a'
            )}
          </h4>
       {
         user ?
         <div>{user.firstName} {user.lastName}</div> :
         null
       }
       {/* {this.props.message.userId} {this.props.message.content} */}
       {message.content}
        </div>
      </li>
    )
  }
}

// const mapState = state => {
//   return {
//     user: state.user
//   }
// }
// const mapDispatch = dispatch => {
//   return {
//     loadUserData(userId) {
//       dispatch(loadUserData(userId))
//     }
//   }
// }
// export default connect(mapState, mapDispatch)(Message)
export default Message
