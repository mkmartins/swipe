import React from 'react'
import { View, Animated, TouchableWithoutFeedback } from 'react-native'

export default class Opacity extends React.Component {

    componentWillMount() {
        this.animation = new Animated.Value(1)
    }
    
    _startAnimation = () => {
        Animated.timing(this.animation, {
            toValue: 0,
            duration: 850
        }).start(() => {
            Animated.timing(this.animation, {
                toValue:1,
                duration: 500
            }).start()
        })
    }

    render() {
        const animateStyle = {
            opacity: this.animation
        }

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this._startAnimation}>
                    <Animated.View style={[styles.ball, animateStyle]}/>
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
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 30,
        borderColor: 'black'
    }
}