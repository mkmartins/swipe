import React from 'react'
import { Animated, View, StyleSheet, Image, Easing, Text, PanResponder } from 'react-native'
import Ball from "../../assets/ball.png"
import BackBoard from "../../assets/board.png";
import Net from "../../assets/net.png";

export default class SandBox extends React.Component {

    constructor () {
        super()
        this.state = {
            _animation: new Animated.Value(0),
            balls: [
                {
                image: Ball,
                animation: new Animated.ValueXY(),
                },
                {
                image: Ball,
                animation: new Animated.ValueXY(),
                },
                {
                image: Ball,
                animation: new Animated.ValueXY(),
                },
                {
                image: Ball,
                animation: new Animated.ValueXY(),
                },
            ],
        }
    }

    componentWillMount() {
        Animated.loop(Animated.timing(this.state._animation, {
            toValue: 1,
            duration: 3500,
            easing: Easing.linear,
        })).start()
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
            this.state.balls.map(({ animation }) => {
                animation.extractOffset();
                // setValue Animated bug fix
                animation.setValue({ x: 0, y: 0 });
            });
            },
            onPanResponderMove: (e, { dx, dy }) => {
                this.state.balls[0].animation.setValue({
                    x: dx,
                    y: dy,
                });

                const animations = this.state.balls.slice(1).map(({ animation }, index) => {
                    return Animated.sequence([
                    Animated.delay(index * 10),
                    Animated.spring(animation, {
                        toValue: { x: dx, y: dy },
                    }),
                    ]).start();
                });
            },
            onPanResponderRelease: (event, gesture) => {
                Animated.decay(this.state._animation, {
                    velocity: { x: gesture.vx, y: gesture.vy },
                    decelaration: 0.9997,
                }).start()
            }
        });
    }

    render() {
        const _Interpolate = 
        this.state._animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "-1080deg"],
        })
        const animatedStyle = {
            transform: [
                {
                    rotateX: _Interpolate
                }
            ]
        }

        return(
            <View style={styles.container}>
                <Image source={BackBoard} style={styles.zone1} />
                <Image source={Net} style={styles.zone2} />
                {this.state.balls.slice(0).reverse().map((item, index, items) => {
                const pan = index === items.length - 1 ? this._panResponder.panHandlers : {};

                    return (
                    <Animated.Image
                        {...pan}
                        key={index}
                        source={item.image}
                        style={[styles.ball, animatedStyle, { transform: item.animation.getTranslateTransform() }]}
                    />
                    );
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    ball: {
        width: 50,
        height: 50,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    zone1: {
        top: 0,
        width: 180,
        height: 180,
        position: "absolute",
    },
    zone2: {
        top: 0,
        width: 180,
        height: 180,
        position: "absolute",
        zIndex: 1
    }
})