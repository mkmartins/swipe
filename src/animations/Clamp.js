import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';

const { width, height } = Dimensions.get('window');
const heightGrid = height/12;
const widthGrid = width/12;

const BOX_DIM = 50;

export default class Clamp extends Component {
  componentWillMount() {
    this.animation = new Animated.ValueXY({x:widthGrid, y:heightGrid});
  }
  _startAnimation = () => {
    Animated.sequence([
      Animated.spring(this.animation.y, {
        toValue: height - heightGrid,
        duration:600,
      }),
      Animated.spring(this.animation.x, {
        toValue: width - (widthGrid*2),
        duration:600,
      }),
      Animated.spring(this.animation.y, {
        toValue: heightGrid,
        duration:600,
      }),
      Animated.spring(this.animation.x, {
        toValue: widthGrid,
        duration:600,
      }),
    ]).start();
  }
  render() {
    const widthRange = [0, width - BOX_DIM];
    const heightRange = [0, height - BOX_DIM];

    const xAnimation = this.animation.x.interpolate({
      inputRange: widthRange,
      outputRange: widthRange,
      extrapolate: 'clamp',
    });
    const yAnimation = this.animation.y.interpolate({
      inputRange: heightRange,
      outputRange: heightRange,
      extrapolate: 'clamp',
    });

    const moveStyle = {
      transform: [
        {
          translateX: xAnimation,
        },
        {
          translateY: yAnimation,
        },
      ],
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
            onPress={this._startAnimation}
        >
            <Animated.View style={[styles.box, moveStyle]} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    height: BOX_DIM,
    width: BOX_DIM,
    backgroundColor: 'tomato',
  },
});