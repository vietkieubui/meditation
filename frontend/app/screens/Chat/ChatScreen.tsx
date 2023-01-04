import {useNavigation} from '@react-navigation/native';
import {activeProfileAtom} from '@utils/active-profile';
import moment from 'moment';
import React, {memo, useRef} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useRecoilValue} from 'recoil';
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
import ModalSearch from './modal.search';
import {useGetConversation} from './query';

const ChatStack = () => {
  const navigation = useNavigation();
  const activeProfile = useRecoilValue(activeProfileAtom);
  const modalSearchRef = useRef();

  const {data} = useGetConversation();

  return (
    <Container>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          const getUser = item?.members.filter(
            element => element.user._id !== activeProfile._id,
          );

          return (
            <Card
              onPress={() =>
                navigation.navigate('Message', {
                  id: item.id,
                })
              }>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={require('../../assets/images/2.png')} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{getUser[0]?.user?.name}</UserName>
                    <PostTime>
                      {moment(getUser[0]?.user?.updatedAt).format('h:mm A')}
                    </PostTime>
                  </UserInfoText>
                  <MessageText>{getUser[0]?.user.phoneNumber}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          );
        }}
      />

      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          modalSearchRef.current?.showModal();
        }}>
        <Text style={styles.searchButtonText}>+</Text>
      </TouchableOpacity>
      <ModalSearch ref={modalSearchRef} />
    </Container>
  );
};

export default memo(ChatStack);

const styles = StyleSheet.create({
  searchButton: {
    backgroundColor: '#FF7B54',
    height: 50,
    width: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
    marginRight: '-85%',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 20,
  },
});
