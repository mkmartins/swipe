import React from 'react'
import { View,
         Image,
         StyleSheet,
         Animated,
         Easing 
} from 'react-native'
import RECORD from '../../assets/LOADING_1.png'
import NEEDLE from '../../assets/LOADING_2.png'

export default class Leading extends React.Component {
    state = {
        _animated: new Animated.Value(0)
    }

    componentWillMount() {
        Animated.loop(Animated.timing(this.state._animated, {
            toValue: 3600,
            duration: 55000,
            easing: Easing.linear
        })).start()
    }


    render() {
        const rotate = this.state._animated.interpolate({
            inputRange: [0, 360],
            outputRange: ["0deg", "1080deg"],
        })
        const animatedStyle = {
            transform: [
                {
                    rotate: rotate
                }
            ]
        }

        return(
            <View style={styles.container}>
                <Image 
                    source={NEEDLE} 
                    style={styles.needle}
                />
                <Animated.Image 
                    source={RECORD} 
                    style={[styles.record, animatedStyle]}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    record: {
        height: 300,
        width: 300,
        zIndex: -1,
    },
    needle: {
        position: 'absolute',
        height: 300,
        width: 300,
    }
})
