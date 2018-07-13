import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  PanResponder,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
  Easing
} from "react-native";
import Ball from "../../assets/ball.png";
import BackBoard from "../../assets/board.png";
import Net from "../../assets/net.png";

const { width, height } = Dimensions.get("window");

const getDirectionAndColor = ({ moveX, moveY, dx, dy }) => {
  const draggedDown = dy > 0;
  const draggedUp = dy < -0;
  const draggedLeft = dx < -0;
  const draggedRight = dx > 0;
  const isRed = moveY < 50 && moveX > 150 && moveX < width - 150;
  const isBlue = moveY > height - 50 && moveX > 0 && moveX < width;
  let dragDirection = "";

  if (draggedDown || draggedUp) {
    if (draggedDown) dragDirection += "dragged down ";
    if (draggedUp) dragDirection += "dragged up ";
  }

  if (draggedLeft || draggedRight) {
    if (draggedLeft) dragDirection += "dragged left ";
    if (draggedRight) dragDirection += "dragged right ";
  }

  if (isRed) return `red ${dragDirection}`;
  if (isBlue) return `blue ${dragDirection}`;
  if (dragDirection) return dragDirection;
};

export default class LearnPanResponder extends Component {
  state = {
    zone: "Still Touchable",
    _animation: new Animated.ValueXY(0),
    message: "",
  };
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => !!getDirectionAndColor(gestureState),
      onPanResponderGrant: (event, gesture) => {
        this.state._animation.extractOffset()
      },
      onPanResponderMove: (evt, gestureState) => {
        Animated.event([
            null,
            {
                dx: this.state._animation.x,
                dy: this.state._animation.y
            }
        ])(evt, gestureState)
        const drag = getDirectionAndColor(gestureState);
        this.setState({
          zone: drag,
        });
      },
      onPanResponderRelease: (event, gesture) => {
            Animated.timing(this.state._rotateAnimation, {
              toValue: 360,
              duration: 1000000,
              easing: Easing.bounce
            }),
            Animated.decay(this.state._animation, {
                velocity: { x: gesture.vx, y: gesture.vy },
                decelaration: 0.9997,
            }).start(()=> {
                const y = parseInt(JSON.stringify(this.state._animation.getTranslateTransform()[1].translateY))
                const x = parseInt(JSON.stringify(this.state._animation.getTranslateTransform()[0].translateX))
                const score = y < (-300) && x < 50 && x > (-50)
                if (score) {
                    this.setState({message: "Score!!!"})
                } else {
                    this.setState({message: "FAIL!"})
                }
            })
        },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
    });
  }

  onPress = () => {
    this.setState({
      zone: "I got touched with a parent pan responder",
    });
  };

  render() {
    
    const animatedStyle = {
      transform: this.state._animation.getTranslateTransform(),
    }

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Image source={BackBoard} style={styles.backboard} />
        <Image source={Net} style={styles.net} />
        <View style={styles.center}>
          <TouchableOpacity onPress={this.onPress}>
            <Text>{this.state.zone}</Text>
            <Text style={styles.score}>{this.state.message}</Text>
          </TouchableOpacity>
          <Animated.Image 
                style={[styles.ball, animatedStyle, ]}
                source={Ball}
                {...this._panResponder.panHandlers}
            />
        </View>
        <View style={styles.zone2} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backboard: {
    top: 0,
    width: 180,
    height: 180,
    position: "absolute",
  },
  net: {
    top: 0,
    width: 180,
    height: 180,
    position: "absolute",
    zIndex: 1
  },
  zone2: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    position: "absolute",
    backgroundColor: "blue",
  },
  ball: {
    width: 50,
    height: 50,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  score: {
    textAlign: 'center',
    letterSpacing: 2,
    fontWeight: 'bold',
    fontSize: 20,
  }
})