import {TopicsProps} from '@constants/Interfaces';
import {HomeStackRoutes} from '@constants/screens';
import {ThemeContext} from '@context/ThemeContext';
import {MyText, SafeView} from '@elements/SharedElements';
import useStyle from '@hooks/useStyle';
import {useNavigation} from '@react-navigation/core';
import {topics} from '@screens/TopicChoose/topics';
import CategoryCard from '@shared/CategoryCard';
import HomeCard from '@shared/HomeCard';
import {HomeSkeleton, HorizontalSkeleton} from '@shared/Skeletons';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const {width} = Dimensions.get('window');

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = () => {
  const {color} = useStyle();
  const {toggleTheme} = useContext(ThemeContext);
  const [data, setData] = useState<any>([]);
  const [time, setTime] = useState('');
  const navigation = useNavigation<any>();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(topics);
    }, 2000);
    return () => {
      setData([]);
    };
  }, []);

  useEffect(() => {
    // set the time according to the current time
    const currentTime = new Date().getHours();
    if (currentTime >= 6 && currentTime < 12) {
      setTime('Chào buổi sáng');
    } else if (currentTime >= 12 && currentTime < 18) {
      setTime('Chào buổi chiều');
    } else {
      setTime('Chào buổi tối');
    }
  }, [time]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData([]);
    wait(1000).then(() => {
      setRefreshing(false);
      setData(topics);
    });
  }, []);

  const goToTopicMusic = (item: TopicsProps) => {
    navigation.navigate(HomeStackRoutes.TopicMusic, {item: item});
  };

  return (
    <SafeView>
      <ScrollView
        overScrollMode="never"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={color.main}
            colors={[color.inverse]}
          />
        }>
        <MyText
          bold
          title
          center
          style={{
            marginTop: 20,
            paddingHorizontal: 10,
            width: width * 0.8,
            alignSelf: 'center',
          }}>
          Trang Chủ
        </MyText>

        <View style={{marginVertical: 20, paddingHorizontal: 10}}>
          <MyText bold title>
            {time}
          </MyText>
          <MyText color={color.grey}>Chúc bạn một ngày tốt lành</MyText>
        </View>
        <View>
          {data.length <= 0 && <HorizontalSkeleton />}
          {data.length > 0 && (
            <FlatList
              data={data}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <CategoryCard
                    item={item}
                    onPress={() => goToTopicMusic(item)}
                  />
                );
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        {/* <MyButton
          onPress={() => {
            navigation.navigate(HomeStackRoutes.HomeMusic);
          }}>
          Music
        </MyButton> */}

        <View style={{paddingHorizontal: 10, marginBottom: 20}}>
          <MyText fontSize={30}>Đề xuất cho bạn</MyText>

          {data.length <= 0 && <HomeSkeleton />}

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
            }}>
            {data.length > 0 &&
              data.map((item: TopicsProps, index: number) => (
                <View key={index}>
                  <HomeCard
                    onPress={() => {
                      console.log(item);
                    }}
                    item={item}
                  />
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default Home;

const styles = StyleSheet.create({
  dailyCarousel: {
    height: 90,
    backgroundColor: '#000',
    alignSelf: 'center',
    width: width * 0.95,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
});
