/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
import React, {useEffect} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAppSelector} from '../app/hooks';

import {
  selectFilter,
  selectFilteredItems,
  selectSelectedItem
} from '../features/products/productsSlice';

import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  useColorScheme,
} from 'react-native';

const Header = (): React.ReactNode => {
  const isDarkMode = useColorScheme() === 'dark';
  const filter = useAppSelector(selectFilter);
  const filteredItems = useAppSelector(selectFilteredItems);
  const selectedItem = useAppSelector(selectSelectedItem);

  // useEffect(() => {
  //   console.log('[Headed.tsx] useEffect selectedItem updated', selectedItem);
  // }, [selectedItem]);

  return (
    <ImageBackground
      accessibilityRole="image"
      testID="new-app-screen-header"
      source={require('react-native/Libraries/NewAppScreen/components/logo.png')}
      style={[
        styles.background,
        {
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start"
        },
      ]}
      imageStyle={styles.logo}>
      <View
        style={[

          {
            flex: 1,
            //    justifyContent:"flex-end",
            //    alignItems:"flex-end",
            backgroundColor: filteredItems.length === 1 ? "azure" : "green"
          }
        ]}
      >

        <Text
          style={[
            styles.text,
            {
              color: isDarkMode ? Colors.white : Colors.black,
              textAlign: "left"
            },
          ]}>
          {`filtered: ${filteredItems.length}`}
        </Text>

        <Text
          style={[
            styles.text,
            {
              color: isDarkMode ? Colors.white : Colors.black,
              textAlign: "left"
            },
          ]}>
          {selectedItem !== null ?
            `${selectedItem.fullName}`
            :
            `Item is not selected`
          }


        </Text>
      </View>


      <View
        style={[

          {
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            backgroundColor: "red"
          }
        ]}
      >

        <Text
          style={[
            styles.text,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          Brand: {`${filter.brand}`}

        </Text>
        <Text
          style={[
            styles.text,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          Quality: {`${filter.quality}`}

        </Text>
        <Text
          style={[
            styles.text,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          Size: {`${filter.size}`}

        </Text>


      </View>


    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
  },
  logo: {
    opacity: 0.2,
    overflow: 'visible',
    resizeMode: 'cover',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    marginLeft: -128,
    marginBottom: -192,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    // textAlign: 'center',
  },
});

export default Header;
