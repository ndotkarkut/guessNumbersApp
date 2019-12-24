import React, { Component, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView
} from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get('window').height);
      setAvailableDeviceWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  return (
    <ScrollView>
    <View style={styles.screen}>
      <TitleText>The Game Is Over!</TitleText>
      <View style={{...styles.imageContainer, ...{
        borderRadius: availableDeviceWidth * 0.7 / 2,
        width: availableDeviceWidth * 0.7,
        height: availableDeviceWidth * 0.7,
        marginVertical: availableDeviceHeight / 30}}
      }>
        <Image
          source={require('../assets/images/success.png')}
          //source={{uri: ''}}
          style={styles.image}
          resizeMode='cover'/>
      </View>
      <View style={{...styles.resultContainer, ...{
        marginVertical: availableDeviceHeight / 60,}}
      }>
        <BodyText style={{...styles.resultText, ...{
        fontSize: availableDeviceHeight < 400 ? 16 : 20,}
        }}>Your phone needed
          <Text style={styles.highlight}> {props.roundsNumber} </Text>
            rounds to guess the number
          <Text style={styles.highlight}> {props.userNumber}</Text>.
        </BodyText>
      </View>
      <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
    </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  imageContainer: {
    borderColor: 'black',
    borderWidth: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'OpenSans-Bold',
  },
  resultText: {
    textAlign: 'center',
  },
  resultContainer: {
    width: '80%',
    marginHorizontal: 30,
  }
});

export default GameOverScreen;
