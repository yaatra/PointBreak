import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { loadUserData } from '../store'
//loadUserData
//user name and user avatar
// const Message = () => {

// Add componentWillRecieveProps lifecycle hook(next set of props = current props (if yes, ok, else fetch data again))
// match.params.id
//JUKE PART 3 has the solution.

class Message extends Component {
  render() {
   const {message} = this.props
   const user = message.user
    return (

      <div className="media">
        <div className="media-body">
        {
         user ?
         <div><h5>{user.firstName} {user.lastName}</h5></div> :
         null
       }
          <small className="media-heading">
            {' '}
            {moment(message.createdAt).format(
              'MMMM Do YYYY, h:mm:ss a'
            )}
          </small><br/>
   
       {/* {this.props.message.userId} {this.props.message.content} */}
       {message.content}
        </div>
        <div className="time-ago">
        <span className="messageTime">{moment(message.createdAt).startOf('hour').fromNow()}</span></div>
      </div>
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
