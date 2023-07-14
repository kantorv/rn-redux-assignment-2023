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

import Header from './products-xstate/Header';

import {ProductsCards} from './products-xstate/ProductsCards';

import { ProductsFilterMachineContext } from './products-xstate/mainmachine'



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
  
      <ProductsFilterMachineContext.Provider>
        <App />
      </ProductsFilterMachineContext.Provider>
  
  );
};

export default Wrapper;
