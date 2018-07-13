import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Deck from './src/Deck';
import { Card, Button } from 'react-native-elements';
import Slides from './src/Slides'
import Ball from './src/animations/Ball'
import Color from './src/animations/Color'
import Opacity from './src/animations/Opacity'
import Scale from './src/animations/Scale'
import Rotate from './src/animations/Rotate'
import Decay from './src/animations/Decay'
import WidthHeight from './src/animations/WidthHeight'
import PanResponder from './src/animations/PanResponder'
import StaggerHeads from './src/animations/StaggeredHeads'
import SandBox from './src/animations/SandBox'
import Loading from './src/animations/Loading'
import Concept from './src/animations/Concept'
import Clamp from './src/animations/Clamp'
import { Scene, Router, Stack } from 'react-native-router-flux'
import Placeholder from './src/animations/Placeholder'
import Heart from './src/animations/Heart'

const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

export default class App extends React.Component {
  _renderCard(item) {
    return (
      <Card
        key={item.id}
        title={item.text}
        image={{ uri: item.uri }}
      >
        <Text style={{ marginBottom: 10 }}>
          Hello World
        </Text>
        <Button
          icon={{ name: 'code' }}
          backgroundColor="#03A9F4"
          title="View Now!"
        />
      </Card>
    )
  }

  _renderNoMoreCards() {
    return (
      <Card title="All Done">
        <Text style={{marginBottom:10}}>
          There's not more content here!
        </Text>
        <Button
          backgroundColor="#03A9F4"
          title="Get More!"
        />
      </Card>
    )
  }

  _routes() {
    return(
      <Router>
        <Stack key="root" panHandlers={null}>
            {/* ANIMATIONS */}
            <Scene key='Heart'        component={Heart}        title='Heart Animation' hideNavBar={true} />
            <Scene key='placeholder'  component={Placeholder}  title='Placeholder Animation' hideNavBar={true} />
            <Scene key='clamp'        component={Clamp}        title='Clamp Animation' hideNavBar={true} />
            <Scene key='concept'      component={Concept}      title='Concept Animation' hideNavBar={true} />
            <Scene key='loading'      component={Loading}      title='Loading Animation' />
            <Scene key='pan'          component={PanResponder} title='PanResponder Animation' hideNavBar={true} />
            <Scene key='sand-box'     component={SandBox}      title='SandBox Animation' />
            <Scene key='stagger-heads'component={StaggerHeads} title='StaggerHeads Animation' hideNavBar={true} />
            <Scene key='decay'        component={Decay}        title='Decay Animation' />
            <Scene key='rotate'       component={Rotate}       title='Rotate Animation' />
            <Scene key='color'        component={Color}        title='Color Animation' />
            <Scene key='width-height' component={WidthHeight}  title='Width and Height Animation' />
            <Scene key='scale'        component={Scale}        title='Scale Animation' />
            <Scene key='opacity'      component={Opacity}      title='Ball Animation' />
            <Scene key='ball'         component={Ball}         title='Ball Animation' />
            <Scene key='slides'       component={Slides}       title='Slide'  hideNavBar={true}/>
            <Scene 
              key='deck' 
              component={Deck} 
              title='Deck' 
              hideNavBar={true} 
              data={DATA}
              renderCard={this._renderCard}
              renderNoMoreCards={this._renderNoMoreCards}
            />
        </Stack>
      </Router>
    )
  }

  render() {
    return (
      this._routes()
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
