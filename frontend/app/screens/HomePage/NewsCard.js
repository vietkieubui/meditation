import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
});

const NewsCard = ({news}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => Linking.openURL(news.link)}>
      <Image source={{uri: news.urlToImage}} style={styles.image} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{news.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCard;
