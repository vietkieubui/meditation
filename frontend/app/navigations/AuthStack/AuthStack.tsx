import {AuthStackRoutes} from '@constants/screens';
import useStyle from '@hooks/useStyle';
import {createStackNavigator} from '@react-navigation/stack';
// import Home from '@screens/HomePage/Home';
import Login from '@screens/Login';
import SignUp from '@screens/SignUp';
import React from 'react';

const Stack = createStackNavigator();

const AuthStack = () => {
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
        headerShown: false,
      }}>
      <Stack.Group>
        <Stack.Screen name={AuthStackRoutes.Login} component={Login} />
      </Stack.Group>

      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name={AuthStackRoutes.Register} component={SignUp} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthStack;
