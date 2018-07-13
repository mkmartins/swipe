import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  image: {
    width: 220,
    height: 220,
  },
  textStyle: {
    fontSize: 20,
  },
  titleStyle: {
    fontFamily: 'ArialRoundedMTBold',
    fontSize: 30,
    color: 'black',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const slides = [
  {
    key: 'somethun',
    title: 'The Yellowphant Club',
    text: 'The Yellowphant Club.\nis a community for those \nwho care for a person \nwith disability',
    image: require('../assets/logo.png'),
    imageStyle: styles.image,
    titleStyle: styles.titleStyle,
    textStyle: styles.textStyle,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'The Yellowphant Club',
    text: 'Thanks to the generosity of \nincredible businesses, members of \nthe Yellowphant Club are given \n multiple awesome deals',
    image: require('../assets/logo.png'),
    imageStyle: styles.image,
    titleStyle: styles.titleStyle,
    textStyle: styles.textStyle,
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun-tes',
    title: 'The Yellowphant Club',
    text: 'All you have to do \nis show at the counter \nthat you have signed up \nwith the app',
    image: require('../assets/logo.png'),
    imageStyle: styles.image,
    titleStyle: styles.titleStyle,
    textStyle: styles.textStyle,
    backgroundColor: '#9b79e4',
  },
  {
    key: 'somethun1',
    title: 'The Yellowphant Club',
    text: 'We trust you and ask you \nthat you only sign up if you are \nsomeone who takes care of an individual \nwith physical or mental disability',
    image: require('../assets/logo.png'),
    imageStyle: styles.image,
    titleStyle: styles.titleStyle,
    textStyle: styles.textStyle,
    backgroundColor: '#fe7171',
  }
];


export default class Slides extends React.Component {
  _onDone = () => {
    Actions.deck()
  }
  render() {
    return (
      <AppIntroSlider
        slides={slides}
        onDone={this._onDone}
        skipLabel
      />
    );
  }
}