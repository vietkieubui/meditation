import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useGetMessage} from './query';

const MessageScreen = () => {
  const [messages, setMessages] = useState([]);

  const id = '6394b621110216165464a232';

  const {data} = useGetMessage(id);

  useEffect(() => {
    setMessages(data);
  }, [data]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default MessageScreen;
