import { ApolloProvider } from '@apollo/client';
// import AuthContextProvider from '@context/AuthContextProvider';
import BottomTabContextProvider from '@context/BottomTabContext';
import ThemeContextProvider from '@context/ThemeContext';
import { client } from '@graphql/client';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AuthContextProvider from './app/context/AuthContextProvider';
import MainApp from './app/MainApp';

export const HOST = '10.29.251.168';
export const PORT = '3001';

const App = () => {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <ThemeContextProvider>
          <BottomTabContextProvider>
            <AuthContextProvider>
              <MainApp />
            </AuthContextProvider>
          </BottomTabContextProvider>
        </ThemeContextProvider>
      </ApolloProvider>
    </NavigationContainer>
  );
};

export default App;
