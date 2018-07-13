import React, { Component } from 'react'
import logo from '../../assets/heart.svg'
import heart from '../../assets/scale.png'
import ruler from '../../assets/ruler.png'
import {Animated, View, Text, Image, StyleSheet, Dimensions} from 'react-native'

class Heart extends Component {
  state = {
    _animated: new Animated.Value(0),
    _animatedScale: new Animated.Value(1),
    _animatedHeart: new Animated.Value(0),
  }

  componentDidMount() {
      Animated.sequence([
        Animated.timing(this.state._animatedScale, {
          toValue: 1.1,
          duration: 150,
        }),
        Animated.timing(this.state._animatedScale, {
          toValue: 1,
          duration: 150,        
        }),
        Animated.timing(this.state._animatedScale, {
          toValue: 1.1,
          duration: 150,
        }),
        Animated.timing(this.state._animatedScale, {
          toValue: 1,
          duration: 150,        
        }),
        Animated.timing(this.state._animatedScale, {
          toValue: 1,
          duration: 200,        
        }),
    ]).start(()=>this.componentDidMount())
  }

  render() {
    const animatedStyle = {
      transform: [
        {translateY: this.state._animated},
        {scale: this.state._animatedScale}
      ]
    }
    return (
      <View style={styles.container}>
        <Animated.Image source={heart} style={[animatedStyle,{height:200, width:200,}]} />
        <Text>Welcome to Bloody React</Text>
        <Animated.Image
          source={heart}
          style={{ top: width/2, position: 'absolute'}}
        />
        <Animated.Image
          source={ruler}
          style={{top: width/2, position: 'absolute',  zIndex: -1}}
        />
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
})

export default Heart;
