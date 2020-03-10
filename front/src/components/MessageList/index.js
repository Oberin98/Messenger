import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';


// Redux
import { connect } from 'react-redux';

//Redux actions
import { setMessages } from '../../redux/actions/actions';

// Server connection
import io from 'socket.io-client';
// import queryString from 'query-string';

// Styles
import './MessageList.css';

// Ations
import {
  ENDPOINT,
  JOIN,
  DISCONNECT,
  MESSAGE,
  SEND_MESSAGE
} from '../../Socket-client/socket-actions';

//Functions
import renderMessages from './renderMessage';

// Sockets 
let socket;

const scrollToRef = (ref) => window.scrollTo(0, ref)

const MessageList = props => {
  const { message, messages, user, chat, audios } = props;
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit(JOIN, { user, chat }, () => {

    });
    socket.emit(MESSAGE + chat, { message }, () => {

    });

    socket.on(SEND_MESSAGE + chat, ({ message }, callback) => {
      props.setMessages(message);
    })

    return () => {
      socket.emit(DISCONNECT);
      socket.off();
    }
  }, [message])

  useEffect(scrollToBottom, [messages]);


  return (
    <div className="message-list">
      <Toolbar
        title="Conversation Title"
        rightItems={[
          <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
          <ToolbarButton key="video" icon="ion-ios-videocam" />,
          <ToolbarButton key="phone" icon="ion-ios-call" />
        ]}
      />
      {
        renderMessages(messages, user)
      }
      {
        !!audios.length && audios.map(audio => <audio controls="controls" src={audio} />)

      }
      <div className="messages-bottom" ref={messagesEndRef} style={{ marginBottom: '40px' }} />

      <Compose rightItems={[
        <ToolbarButton key="photo" icon="ion-ios-camera" />,
        <ToolbarButton key="image" icon="ion-ios-image" />,
        <ToolbarButton key="audio" icon="ion-ios-mic" />,
        <ToolbarButton key="money" icon="ion-ios-card" />,
        <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
        <ToolbarButton key="emoji" icon="ion-ios-happy" />
      ]} />
    </div >
  );
}

const mapStateToProps = state => {
  return {
    message: state.message,
    messages: state.messages,
    user: state.user,
    chat: state.chat,
    audios: state.audios
  }
}

export default connect(
  mapStateToProps,
  { setMessages }
)(MessageList)  
