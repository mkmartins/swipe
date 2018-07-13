import React from 'react'
import { View, Animated, TouchableWithoutFeedback, Text, Easing } from 'react-native'

export default class Opacity extends React.Component {

    componentWillMount() {
        this._animation = new Animated.Value(0)
    }
    
    _startAnimation = () => {
        Animated.loop(Animated.timing(this._animation, {
            toValue: 360,
            duration: 1000000,
            easing: Easing.bounce
        })).start()
    }

    render() {
        const rotateInterpolate = 
        this._animation.interpolate({
            inputRange: [0, 360],
            outputRange: ["0deg", "1080deg"],
        })
        const animatedStyle = {
            transform: [
                {
                    rotateX: rotateInterpolate
                }
            ]
        }

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this._startAnimation}>
                    <Animated.View style={[styles.ball, animatedStyle]}>
                        <Text style={styles.container}>1989</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = {
    container: {
        flex:1,
        alignSelf:'center',
        justifyContent: 'center',
    },
    ball: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 10,
        borderColor: 'black'
    }
}