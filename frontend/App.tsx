import {ApolloProvider} from '@apollo/client';
import LoadingScreen from './app/components/loading-screen';
// import AuthContextProvider from '@context/AuthContextProvider';
import BottomTabContextProvider from '@context/BottomTabContext';
import ThemeContextProvider from '@context/ThemeContext';
import {client} from '@graphql/client';
import {NavigationContainer} from '@react-navigation/native';
import {toastConfig} from '@utils/helpers';
import React, {Suspense} from 'react';
import Toast from 'react-native-toast-message';
import {QueryClient, QueryClientProvider} from 'react-query';
import {RecoilRoot} from 'recoil';
import AuthContextProvider from './app/context/AuthContextProvider';
import MainApp from './app/MainApp';

export const HOST = '192.168.43.30';
export const PORT = '3001';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <ApolloProvider client={client}>
              <ThemeContextProvider>
                <BottomTabContextProvider>
                  <AuthContextProvider>
                    <MainApp />
                    <Toast config={toastConfig} />
                  </AuthContextProvider>
                </BottomTabContextProvider>
              </ThemeContextProvider>
            </ApolloProvider>
          </NavigationContainer>
        </QueryClientProvider>
      </RecoilRoot>
    </Suspense>
  );
};

export default App;
