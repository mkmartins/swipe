import React from 'react'
import { View, Animated, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native'

export default class Scale extends React.Component {

    componentWillMount() {
        this._animation = new Animated.Value(1)
    }

    _startAnimation = () => {
        Animated.timing(this._animation, {
            toValue: 2,
            duration: 1500,
        }).start(() => {
            Animated.timing(this._animation,{
                toValue: -2,
                duration: 1500
            }).start()
            });
    }

    render() {
        const animatedStyles = {
            transform: [
              { scaleY: this._animation }
            ]
        }
        return (
            <View style={styles.container}>
            <Text>1989</Text>
                <TouchableWithoutFeedback onPress={this._startAnimation}>
                    <Animated.View style={[styles.ball, animatedStyles]}>
                        <Text style={{backgroundColor:'white'}}>1989</Text>
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
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 30,
        borderColor: 'black',
    }
})