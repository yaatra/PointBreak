import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postMessage, writeMessage } from '../store'

class NewMessageEntry extends Component {
  constructor(props){
    super(props)
    this.state = {
      messageEntry: ''
    }

    this.handleSubmitLocal = this.handleSubmitLocal.bind(this)
    this.handleChangeLocal = this.handleChangeLocal.bind(this)
  }

  handleSubmitLocal(evt){
    evt.preventDefault()
    const message = {
      content: this.state.messageEntry,
      userId: this.props.userId,
      eventId: this.props.eventId
    }
    console.log(message)
    const user = this.props.user
    this.props.handleSubmit(message, user)
  }

  handleChangeLocal(evt){
    this.setState({ messageEntry: evt.target.value })
  }

  render(){
  // const { user, newMessageEntry, event, handleChange } = props

  return (
    <form
      id="new-message-form"
      onSubmit={this.handleSubmitLocal}>
      <div className="input-group input-group-lg">
        <input
          className="form-control"
          type="text"
          name="content"
          value={this.newMessageEntry}
          onChange={this.handleChangeLocal}
          placeholder="Enter text..."
        />
        <span className="input-group-btn">
          <button className="btn btn-default" type="submit">
            Enter
          </button>
        </span>
      </div>
    </form>
  )
}
}

const mapStateToProps = function(state, ownProps) {
  return {
    newMessageEntry: state.newMessageEntry,
    user: state.user,
    userId: state.user.id,
    eventId: state.events.singleEvent.id
  }
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    handleChange(evt) {

      dispatch(writeMessage(evt.target.value))
    },
    handleSubmit(message, user) {
      //evt.preventDefault()

      //const { eventId } = ownProps
      dispatch(postMessage(message, user))
      dispatch(writeMessage(''))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry);
