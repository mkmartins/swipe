import React from 'react'
import { Animated, 
         TouchableWithoutFeedback, 
         StyleSheet, 
         View,
         PanResponder
} from 'react-native'

export default class Decay extends React.Component {

    state = {
        _animation: new Animated.ValueXY(0)
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (event, gesture) => {
                this.state._animation.extractOffset()
            },
            onPanResponderMove: Animated.event([
                null,
                {
                    dx: this.state._animation.x,
                    dy: this.state._animation.y
                }
            ]),
            onPanResponderRelease: (event, gesture) => {
                Animated.decay(this.state._animation, {
                    velocity: { x: gesture.vx, y: gesture.vy },
                    decelaration: 0.9997,
                }).start()
            }
        })
    }

    render() {
        const animatedStyle = {
            transform: this.state._animation.getTranslateTransform()
        }
        return(
            <View style={styles.container}>
                    <Animated.View 
                        style={[styles.circle, animatedStyle]}
                        { ...this._panResponder.panHandlers }
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        height: 100,
        width: 100,
        borderWidth: 10,
        borderRadius: 50,
    }
})