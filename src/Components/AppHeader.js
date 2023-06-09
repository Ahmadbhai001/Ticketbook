import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLOR} from '../common/Color'

const AppHeader = () => {
  return (
    <Header
      backgroundColor={COLOR.HeaderColor}
      leftComponent={<AntDesign name="caretleft" size={20} color={'#ffffff'} />}
      centerComponent={{ text: "Sign In", style: styles.heading }}
      
    />
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  heading: {
    color: COLOR.TextColor,
    fontSize: 22,
    fontWeight: 'bold',
  },
});
