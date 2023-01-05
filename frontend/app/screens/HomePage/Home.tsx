import {TopicsProps} from '@constants/Interfaces';
import {HomeStackRoutes} from '@constants/screens';
import {ThemeContext} from '@context/ThemeContext';
import {MyText, SafeView} from '@elements/SharedElements';
import useStyle from '@hooks/useStyle';
import {useNavigation} from '@react-navigation/core';
import {topics} from '@screens/TopicChoose/topics';
import CategoryCard from '@shared/CategoryCard';
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
import NewsCard from './NewsCard';

const {width} = Dimensions.get('window');

const newsModel = [
  {
    urlToImage:
      'https://suckhoedoisong.qltns.mediacdn.vn/zoom/260_155/324455921873985536/2021/8/15/thien-anh-nen-1629020326633796591950-0-24-900-1464-crop-16290203311801571560348.jpg',
    title: 'Vai trò của thiền định đối với sức khỏe con người',
    link: 'https://suckhoedoisong.vn/vai-tro-cua-thien-dinh-doi-voi-suc-khoe-con-nguoi-169220117230633091.htm',
  },
  {
    urlToImage:
      'https://suckhoedoisong.qltns.mediacdn.vn/Images/haiyen/2016/04/23/thien.jpg',
    title: '6 lợi ích của việc thiền định mỗi ngày',
    link: 'https://suckhoedoisong.vn/6-loi-ich-cua-viec-thien-dinh-moi-ngay-169115571.htm',
  },
  {
    urlToImage:
      'https://suckhoedoisong.qltns.mediacdn.vn/zoom/260_155/Images/duylinh/2019/01/01/tre-mai-khong-gia-nho-thien-dinh1546291635.png',
    title: 'Trẻ mãi không già nhờ thiền định',
    link: 'https://suckhoedoisong.vn/tre-mai-khong-gia-nho-thien-dinh-169152322.htm',
  },
  {
    urlToImage:
      'http://philosophy.vass.gov.vn/content/tintuc/PublishingImages/%E1%BA%A2nh%20T%E1%BA%A1p%20ch%C3%AD%20Tri%E1%BA%BFt%20h%E1%BB%8Dc/Nam2021/thi%E1%BB%81n.jpg',
    title: 'Một số tư tưởng thiền học cơ bản của Trần Thái Tông',
    link: 'https://suckhoedoisong.vn/vai-tro-cua-thien-dinh-doi-voi-suc-khoe-con-nguoi-169220117230633091.htm',
  },
  {
    urlToImage:
      'https://vinmec-prod.s3.amazonaws.com/images/20210309_030300_399761_tu_the_thien_1.max-1800x1800.jpg',
    title: '9 loại thiền: Loại nào phù hợp với bạn?',
    link: 'https://suckhoedoisong.vn/6-loi-ich-cua-viec-thien-dinh-moi-ngay-169115571.htm',
  },
  {
    urlToImage:
      'https://suckhoedoisong.qltns.mediacdn.vn/zoom/260_155/Images/duylinh/2019/01/01/tre-mai-khong-gia-nho-thien-dinh1546291635.png',
    title: 'Trẻ mãi không già nhờ thiền định',
    link: 'https://suckhoedoisong.vn/tre-mai-khong-gia-nho-thien-dinh-169152322.htm',
  },
];

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
      setTime('Chào buổi tối');
    } else if (currentTime >= 12 && currentTime < 18) {
      setTime('Chào buổi chiều');
    } else {
      setTime('Chào buổi sáng');
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

        <View style={{marginTop: 20, paddingHorizontal: 10}}>
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
            navigation.navigate(HomeStackRoutes.TopicMusic);
          }}>
          Music
        </MyButton> */}

        <View style={{paddingHorizontal: 10, marginTop: 10}}>
          <MyText fontSize={26}>Bài đọc hay</MyText>

          {data.length <= 0 && <HomeSkeleton />}

          <FlatList
            contentContainerStyle={{flexGrow: 1}}
            data={newsModel}
            renderItem={({item}) => <NewsCard news={item} />}
            onEndReachedThreshold={0.2}
          />
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
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
