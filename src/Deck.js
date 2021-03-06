import React from 'react'
import { View,
         Animated,
         PanResponder,
         Dimensions,
         LayoutAnimation,
         UIManager 
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

class Deck extends React.Component {

    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {},
    }

    constructor(props) {
        super(props)

        const position = new Animated.ValueXY()
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy})
            },
            onPanResponderRelease: (event, gesture) => {
                console.log(gesture)
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwip('right')
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwip('left')
                } else {
                    this.resetPosition()
                }
            }
        })

        this.state = { panResponder, position, index: 0 }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ index:0 })
        }
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
        LayoutAnimation.spring()
    }

    forceSwip(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
        Animated.timing(this.state.position, {
            toValue: {x, y:0},
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction))
    }

    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props
        const item = data[this.state.index]
        direction === 'right' ? onSwipeRight() : onSwipeLeft()
        this.state.position.setValue({ x:0, y:0 })
        this.setState({ index: this.state.index + 1 })
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 }
        }).start()
    }

    getCardStyle() {
        const { position } = this.state
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 2.0, 0, SCREEN_WIDTH * 2.0],
            outputRange: ['-120deg', '0deg', '120deg']
        })

        return {
            ...this.state.position.getLayout(),
            transform: [{ rotate: rotate }]
        }
    }

    renderCards() {

        if(this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards()
        }

        return this.props.data.map((item, i)=> {
            if (i < this.state.index) {return null}

            if (i === this.state.index) {
                return (
                    <Animated.View 
                        key={item.id}
                        style={[this.getCardStyle(), styles.cardSyle]}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>                    
                )
            }
            return (
                <Animated.View 
                    key={item.id} 
                    style={[styles.cardSyle, { top: 10 * (i - this.state.index) }]}
                >
                    {this.props.renderCard(item)}
                </Animated.View>
            )
        }).reverse()
    }

    render() {
        return (
            <View>
                {this.renderCards()}
                
            </View>
        )
    }
}

const styles = {
    cardSyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    }
}

export default Deck