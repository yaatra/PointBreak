import React from 'react'
import { connect } from 'react-redux'
import { postMessage, writeMessage } from '../store'

function NewMessageEntry(props) {
  const { name, newMessageEntry, handleChange, handleSubmit } = props

  return (
    <form
      id="new-message-form"
      onSubmit={evt => handleSubmit(name, newMessageEntry, evt)}
    >
      <div className="input-group input-group-lg">
        <input
          className="form-control"
          type="text"
          name="content"
          value={newMessageEntry}
          onChange={handleChange}
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

const mapStateToProps = function(state, ownProps) {
  return {
    newMessageEntry: state.newMessageEntry,
    name: state.name
  }
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    handleChange(evt) {

      dispatch(writeMessage(evt.target.value))
    },
    handleSubmit(name, content, evt) {
      evt.preventDefault()

      const { eventId } = ownProps
      dispatch(postMessage({ name, content, eventId }))
      dispatch(writeMessage(''))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry);
