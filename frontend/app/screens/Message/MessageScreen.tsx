import {useRoute} from '@react-navigation/native';
import {activeProfileAtom} from '@utils/active-profile';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import CryptoJS from 'react-native-crypto-js';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRecoilValue} from 'recoil';
import {useMutationPushChat} from './mutate';
import {useGetMessage} from './query';
const key = 'B374A26A71490437AA024E4FADD5B497FDFF1A8EA6FF12F6FB65AF2720B59CCF';

const MessageScreen = () => {
  const route = useRoute();
  const {params} = route;
  const {id} = params;

  const activeProfile = useRecoilValue(activeProfileAtom);

  const [messages, setMessages] = useState([]);

  const {data: dataMessage} = useGetMessage(id);

  const {mutate: pushChat} = useMutationPushChat(id);

  // Decrypt

  const decryptText = useCallback(text => {
    let bytes = CryptoJS.AES.decrypt(text, key);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }, []);

  const convertMess = useCallback(
    item => {
      let newMessage = {
        ...item,
        _id: item?._id,
        text: item?.content ? decryptText(item?.content) : '',
        user: {
          _id: item?.sentBy?._id,
          name: item?.sentBy?.name,
          avatar: require('../../assets/images/2.png'),
        },
      };

      return {...newMessage};
    },
    [decryptText],
  );

  useEffect(() => {
    if (!Array.isArray(dataMessage) || !dataMessage.length) {
      setMessages([]);
    } else {
      const convertData = dataMessage.map(item => convertMess(item));
      setMessages(convertData);
    }
  }, [convertMess, dataMessage]);

  const onSend = useCallback(
    (messages = []) => {
      // Encrypt
      let ciphertext = CryptoJS.AES.encrypt(messages[0].text, key).toString();

      pushChat(ciphertext);
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
    },
    [pushChat],
  );

  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: activeProfile?._id,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default MessageScreen;
