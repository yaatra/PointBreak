import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchMessages, loadUserData } from "../store"
import NewMessageEntry from "./newMessage"
import Message from "./Message"
class Chat extends Component {
  componentDidMount() {
    const { fetchMessages } = this.props
    fetchMessages(this.props.eventId)
    // const {loadUserData} = this.props
    // loadUserData(userId)
  }

  componentWillReceiveProps(nextProps) {
    const nextEventId = nextProps.eventId
    const currentEventId = this.props.eventId

    if (nextEventId !== currentEventId) {
      this.props.fetchMessages(nextEventId)
    }
  }

  render() {
    // const { messages, loadUserData, user} = this.props
    const { messages} = this.props
    return (
      <div className="row">
      <div className="col-xs-12">
				<div className="panel panel-default panel-card">
        <div className="panel-heading" id="message">
						Messages 
					</div>
          <div className="panel-body panel-message">
						<ul className="list-unstyled panel-list">
          {messages.map(message => (
            <li key={message.id} className="messageCommon recentMessage listWrapper">
            <span className="messageInfo">
            <Message message={message} />
            </span>
            </li>
          ))}
        </ul>
        </div>
        <NewMessageEntry />
      </div>
      </div>
      </div>

    )
  }
}
const mapStateToProps = state => ({
  messages: state.messages,
  // user: state.user
})
const mapDispatchToProps = dispatch => ({
  fetchMessages(eventId) {
    dispatch(fetchMessages(eventId))
  }
  // ,
  // loadUserData(userId) {
  //   dispatch(loadUserData(userId))
  // }
})
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
export default connect(mapStateToProps, mapDispatchToProps)(Chat)
