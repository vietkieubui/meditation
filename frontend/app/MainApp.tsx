import {HEIGHT} from '@constants/const';
import {MyText} from '@elements/SharedElements';
import useNavHelper from '@helpers/navHelper';
import {useNetInfo} from '@react-native-community/netinfo';
import {accessTokenState} from '@state-management/access-token';
import API from '@utils/API';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {useRecoilValue} from 'recoil';
import AuthStack from './navigations/AuthStack/AuthStack';
import MainStack from './navigations/MainStack';

const MainApp = () => {
  const {goToDownloadedList} = useNavHelper();
  const [show, setShow] = useState(false);
  const netInfo = useNetInfo();
  const accessToken = useRecoilValue(accessTokenState);
  API.accessToken = accessToken;

  useEffect(() => {
    if (netInfo.isConnected) {
      setShow(false);
    } else {
      setShow(true);
    }
    return () => {
      setShow(false);
    };
  }, [netInfo]);

  return (
    <>
      {!accessToken ? (
        <AuthStack />
      ) : (
        <>
          <MainStack />
          {show && (
            <>
              <Pressable
                onPress={() => {
                  setShow(false);
                }}
                style={{
                  flex: 1,
                  backgroundColor: '#00000080',
                  ...StyleSheet.absoluteFillObject,
                  height: '100%',
                }}>
                <Pressable
                  style={{
                    backgroundColor: 'red',
                    padding: 20,
                    marginHorizontal: 50,
                    borderRadius: 50,
                    bottom: -HEIGHT / 1.2,
                  }}
                  onPress={() => {
                    goToDownloadedList();
                    setShow(false);
                  }}>
                  <MyText center color="#fff" fontSize={30}>
                    Go To Downloads
                  </MyText>
                </Pressable>
              </Pressable>
            </>
          )}
        </>
      )}
    </>
  );
};

export default MainApp;
