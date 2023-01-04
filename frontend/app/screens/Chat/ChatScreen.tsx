import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {
  Card,
  Container,
  MessageText,
  PostTime,
  TextSection,
  UserImg,
  UserImgWrapper,
  UserInfo,
  UserInfoText,
  UserName,
} from './ChatStyles';
import {useGetConversation} from './query';

const Messages = [
  {
    id: '1',
    userName: '1-Jenny Doe',
    userImg: require('../../assets/images/1.png'),
    messageTime: '4 min ago',
    messageText: 'Helllooooo',
  },
  {
    id: '2',
    userName: '2-Jenny Doe',
    userImg: require('../../assets/images/2.png'),
    messageTime: '4 min ago',
    messageText: 'Helllooooo',
  },
  {
    id: '3',
    userName: '3-Jenny Doe',
    messageTime: '4 min ago',
    userImg: require('../../assets/images/3.png'),
    messageText: 'Helllooooo',
  },
  {
    id: '4',
    userName: '4-Jenny Doe',
    messageTime: '4 min ago',
    userImg: require('../../assets/images/4.png'),
    messageText: 'Helllooooo',
  },
];

const ChatStack = () => {
  const navigation = useNavigation();

  const {data} = useGetConversation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <Container>
      <FlatList
        data={Messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Card
            onPress={() =>
              navigation.navigate('Message', {userName: item.userName})
            }>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={item.userImg} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.userName}</UserName>
                  <PostTime>{item.messageTime}</PostTime>
                </UserInfoText>
                <MessageText>{item.messageText}</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />

      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </Container>
  );
};

export default memo(ChatStack);
