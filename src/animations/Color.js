import React from 'react'
import { View, Animated, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native'

export default class Scale extends React.Component {

    componentWillMount() {
        this._animation = new Animated.Value(0)
    }

    _startAnimation = () => {
        Animated.timing(this._animation, {
            toValue: 1,
            duration: 1500,
        }).start(() => {
            Animated.timing(this._animation,{
                toValue: 0,
                duration: 1500
            }).start()
            });
    }

    render() {
        const boxInterpolation = this._animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"]
        })

        const colorInterpolation = this._animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["rgb(99,71,255)", "rgb(255,99,71)"]
        })

        const boxAnimatedStyles = {
            borderColor: boxInterpolation
        }
        
        const textAnimatedStyle = {
            color: colorInterpolation
        }
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this._startAnimation}>
                    <Animated.View style={[styles.ball, boxAnimatedStyles]}>
                        <Animated.Text style={textAnimatedStyle}>1989</Animated.Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignSelf:'center',
        justifyContent: 'center',
    },
    ball: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 50,
        // borderColor: 'black',
    }
})