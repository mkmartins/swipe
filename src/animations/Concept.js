import React from 'react'
import { View, Text, Image, StyleSheet, Animated, TouchableWithoutFeedback, Easing, Dimensions } from 'react-native'
import LOGO from "../../assets/nys.png"
import LOGO2 from "../../assets/logo.png"

export default class Concept extends React.Component {
    state={
        _animated: new Animated.Value(0),
        _animatedLogo: new Animated.ValueXY(0),
        _animatedRotateLogo: new Animated.Value(0)
    }

    startAnimation = () => {
        console.log(this.state._animatedLogo.getTranslateTransform()[0].translateX)
        const { width, height } = Dimensions.get("window")

        Animated.loop(
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(this.state._animated, {
                        toValue: width,
                        duration: 5000,
                    }),
                    Animated.timing(this.state._animated, {
                        toValue: 0,
                        duration: 5000,
                    })
                ]),
                Animated.sequence([
                    Animated.timing(this.state._animatedLogo.x, {
                        toValue: width - this._width,
                        duration: 5000
                    }),
                    Animated.spring(this.state._animatedRotateLogo, {
                        toValue: 1
                    }),
                    Animated.timing(this.state._animatedLogo.x, {
                        toValue: 0,
                        duration: 5000
                    }),
                    Animated.spring(this.state._animatedRotateLogo, {
                        toValue: 0
                    }),
                ])
            ])
        ).start()
    }

    _saveDimensions = (e) => {
        this._width = e.nativeEvent.layout.width
        this._height = e.nativeEvent.layout.height
    }

    render() {
        const animatedStyle = {
            transform: [
                {
                    scale: this.state._animated
                }
            ]
        }
        const animatedLogo = {
            transform: [
                {
                    translateX: this.state._animatedLogo.getTranslateTransform()[0].translateX
                }
            ]
            //transform: this.state._animatedLogo.getTranslateTransform()
        }
        const rotateInterpolate = 
        this.state._animatedRotateLogo.interpolate({
            inputRange: [0,1],
            outputRange: ["0deg", "180deg"],
            extrapolate: 'clamp',
        })
        const animatedRotateLogo = {
            transform: [
                {
                    translateX: this.state._animatedLogo.getTranslateTransform()[0].translateX
                },
                {
                    rotateY: rotateInterpolate,
                }
            ]
        }

        return(
            <View style={styles.content}>
                <Image 
                    source={LOGO} 
                    style={styles.logo}
                />
                <View style={styles.separator}/>
                <TouchableWithoutFeedback onPress={this.startAnimation}>
                    <View style={styles.innerContainer}>
                        <Animated.View  style={[styles.square, animatedStyle]} />
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.separator}/>
                <Animated.Image 
                    onLayout={this._saveDimensions}
                    source={LOGO2} 
                    style={[styles.yellowphant, animatedRotateLogo]}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: 'black',
    },
    innerContainer: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator: {
        borderBottomColor: 'white',
        borderBottomWidth: 2.5,
        width: '100%',
    },
    logo: {
        marginTop: 20,
        marginBottom: 20,
        height: 80,
        width: 80,
    },
    yellowphant: {
        flex:1,
        position: "absolute",
        marginTop: 20,
        marginBottom: 20,
        height: 80,
        width: 80,
        bottom: 0,
    },
    square: {
        backgroundColor: 'white',
        width:1,
        height:1,
        //borderRadius: 50,
    }
})