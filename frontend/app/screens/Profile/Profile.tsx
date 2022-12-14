import {days} from '@constants/const';
import {MyText, SafeView} from '@elements/SharedElements';
import useNavHelper from '@helpers/navHelper';
import useStyle from '@hooks/useStyle';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Days} from '@screens/Welcome/Remainder';
import {accessTokenState} from '@state-management/access-token';
import {activeProfileAtom} from '@utils/active-profile';
import moment from 'moment';
import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useRecoilValue, useSetRecoilState} from 'recoil';

const Profile = () => {
  const {color} = useStyle();
  const [time, setTime] = useState(new Date(1598055340000));
  const [show, setShow] = useState(false);
  const [allDay, setAllDay] = useState<typeof days>([]);
  const {goToTrackUpload} = useNavHelper();
  const activeProfile = useRecoilValue(activeProfileAtom);

  const setAccessToken = useSetRecoilState(accessTokenState);

  const showTime = () => {
    setShow(true);
  };

  const onChange = (_: any, selectedDate: any) => {
    const currentDate = selectedDate || time;
    setTime(currentDate);
    setShow(false);
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeView
      style={{
        padding: 10,
      }}>
      <View style={styles.topView}>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            onPress={goToTrackUpload}
            style={{
              width: 70,
              height: 70,
              backgroundColor: '#A5AEFF',
              borderRadius: 50,
            }}
          />
          <MyText style={{marginTop: 15, marginLeft: 10}} fontSize={30}>
            {activeProfile?.name}
          </MyText>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setAccessToken(undefined);
          }}>
          <Text>????ng xu???t</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.followerView}>
        <View>
          <MyText center>5</MyText>
          <MyText color={color.grey}>Days</MyText>
        </View>
        <View>
          <MyText center>100</MyText>
          <MyText color={color.grey}>Followers</MyText>
        </View>
        <View>
          <MyText center>600</MyText>
          <MyText color={color.grey}>Following</MyText>
        </View>
      </View> */}

      <View style={{marginTop: 30}}>
        <MyText>L???ch c???a t??i</MyText>
        <View style={{paddingHorizontal: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 20,
              flexWrap: 'wrap',
            }}>
            <MyText fontSize={25}>Th???i gian: </MyText>
            <Pressable
              onPress={showTime}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <MyText title style={{marginRight: 10}}>
                {moment(time).format('h:mm A')}
              </MyText>
              <Icon name="edit" size={25} color={color.textColor} />
            </Pressable>

            {show && (
              <DateTimePicker
                onChange={onChange}
                display="default"
                mode="time"
                value={time}
              />
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 30,
            }}>
            {days.map((day, index) => {
              return (
                <Days key={index} {...{day}} {...{allDay}} {...{setAllDay}} />
              );
            })}
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <MyText fontSize={25}>Nh???n th??ng b??o h???ng ng??y</MyText>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#81b0ff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <Pressable
          onPress={goToTrackUpload}
          style={{
            width: '100%',
            height: 70,
            backgroundColor: '#0081C9',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <MyText fontSize={30}>????ng nh???c</MyText>
        </Pressable>
      </View>
    </SafeView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  topView: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  followerView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
