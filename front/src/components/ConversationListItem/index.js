import React, { useEffect, useRef } from 'react';
import shave from 'shave';
import { connect } from 'react-redux';
import { keys, last, isEmpty } from 'lodash'
import { startChatReq } from '../../redux/actions/actions'

import './ConversationListItemBlack.css';

const ConversationListItem = (props) => {
  useEffect(() => {
    shave('.conversation-snippet', 20);
  })

  const chatItem = useRef(null);
  const { startChatReq, currentChat, isAuth, chats } = props;
  const { _id } = props.chat;

  const chat = _id;
  const { messages, members } = chats[chat];
  const keysOfMessages = Object.keys(messages);
  const { messageType, content } = messages[last(keysOfMessages)]
  debugger
  const startChat = () => {
    startChatReq(chat, isAuth);
  }

  useEffect(() => {
    if (_id === currentChat) {
      chatItem.current.className = 'conversation-list-item active-item';
    } else {
      chatItem.current.className = 'conversation-list-item';
    }
  }, [currentChat])


  return (
    <div ref={chatItem} onClick={startChat}>
      <img className="conversation-photo" src={members[0].avatar} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{members[0].name}</h1>
        {
          !isEmpty(messages) &&
          <p className="conversation-snippet">{
            messageType === 'Audio' ? 'Audio message' :
              messageType === 'String' ? content :
                "There's no messages yeat..."
          }</p>
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.userReducer.isAuth,
  currentChat: state.chatReducer.chat,
  chats: state.chatReducer.chats,
})




export default connect(mapStateToProps, { startChatReq })(ConversationListItem)
