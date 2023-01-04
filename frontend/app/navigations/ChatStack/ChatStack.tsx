import {ChatStackRoutes} from '@constants/screens';
import useStyle from '@hooks/useStyle';
import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from '@screens/Chat/ChatScreen';
import MessageScreen from '@screens/Message/MessageScreen';
import React from 'react';

const Stack = createStackNavigator();

const ChatStack = () => {
  const {color} = useStyle();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: color.main,
          elevation: 0,
        },
        headerTintColor: color.textColor,
        headerTitleAlign: 'center',
        cardStyle: {
          backgroundColor: 'transparent',
        },
        headerMode: 'float',
      }}>
      <Stack.Group>
        <Stack.Screen name={ChatStackRoutes.Chat} component={ChatScreen} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name={ChatStackRoutes.Message}
          component={MessageScreen}
          options={({route}) => ({
            title: route.params.userName,
            headerBackTitleVisible: false,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ChatStack;
