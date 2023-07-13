/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Header from './components/Header';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {ProductsCards} from './features/products/ProductsCards';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <ProductsCards />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Wrapper = () => {
  useEffect(() => {
    console.log('[App.tsx] Wrapper useEffect called');
  }, []);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Wrapper;
