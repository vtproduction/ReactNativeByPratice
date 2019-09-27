import { StyleSheet, 
  View, 
  Alert,
  Image,
  TouchableHighlight,
  BackHandler } from 'react-native';
import React from 'react'
import Status from './components/Status'
import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'
import ImageGrid from './components/ImageGrid'
import KeyboardState from './components/KeyboardState'; import MeasureLayout from './components/MeasureLayout'; import MessagingContainer, {
  INPUT_METHOD,
} from './components/MessagingContainer'
import {
  createImageMessage,
  createLocationMessage,
  createTextMessage,
} from './utils/MessageUtils';

export default class App extends React.Component {

  componentWillMount() {
    this.subscription =  BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        const {fullscreenImageId} = this.state

        if (fullscreenImageId) {
          this.dismissFullscreenImage()
          return true
        }

        return false
      }
    )
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  state = {
    messages: [
      createImageMessage('https://unsplash.it/300/300'),
      createTextMessage('World'),
      createTextMessage('Hello'),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
      }),
    ],
    fullscreenImageId: null,
    isInputFocused: false,
    inputMethod: INPUT_METHOD.NONE,
  };

  handleChangeInputMethod = (inputMethod) => {
    this.setState({ inputMethod });
  }

  handlePressToolbarCamera = () => { // ...
    this.setState({
      isInputFocused: false,
      inputMethod: INPUT_METHOD.CUSTOM,
    })
  }

  handlePressToolbarLocation = () => { // ...
    const { messages } = this.state
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords: { latitude, longitude } } = position;
      this.setState({
        messages: [
          createLocationMessage({
            latitude,
            longitude,
          }),
          ...messages,],
      })
    })
  }

  handleChangeFocus = (isFocused) => {
    this.setState({ isInputFocused: isFocused })
    
  }

  handlePressMessage = ({id, type}) => {
    switch (type) {
      case 'text':
        Alert.alert(
          'Delete msg?',
          'Sure?',
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },{
              text: 'Delete',
              style: 'destructive',
              onPress: () =>{
                this.deleteMsg(id)
              }
            }
          ]
        )
        break;
      case 'image':
        this.setState({ 
          fullscreenImageId: id,
          isInputFocused: false 
        })
        break;
      default:
        break;
    }
  }

  handleSubmit = (text) => {
    const { messages } = this.state;
    this.setState({
      messages: [createTextMessage(text), ...messages],
    });
  }


  deleteMsg = (id) =>{
    const {messages} = this.state
    this.setState({
      messages: messages.filter(
        m => m.id !== id
      )
    })
  }

  renderToolbar() {
    const { isInputFocused } = this.state;
    return (
      <View style={styles.toolbar}>
        <Toolbar
          isFocused={isInputFocused} 
          onSubmit={this.handleSubmit} 
          onChangeFocus={this.handleChangeFocus} 
          onPressCamera={this.handlePressToolbarCamera} 
          onPressLocation={this.handlePressToolbarLocation}/> 
      </View>
    );
  }

  renderFullscreenImage = () => {
    const { messages, fullscreenImageId } = this.state;
    if (!fullscreenImageId) return null;
    const image = messages.find(
      message => message.id === fullscreenImageId,
    );
    if (!image) return null; 
    const { uri } = image;
    return (
      <TouchableHighlight 
        style={styles.fullscreenOverlay}
        onPress={this.dismissFullscreenImage} >
        <Image style={styles.fullscreenImage} source={{ uri }} />
      </TouchableHighlight>
    );
  };


  dismissFullscreenImage = () => {
    this.setState({ fullscreenImageId: null });
  }


  renderMessageList() {
    const { messages } = this.state;

    return (
      <View style={styles.content}>

        <MessageList
          messages={messages} onPressMessage={this.handlePressMessage}
        />
      </View>
    );
  }
  renderInputMethodEditor() {
    return (
      <View style={styles.inputMethodEditor}><ImageGrid
        onPressImage={this.handlePressImage}/></View>
    );
  }

  handlePressImage = (uri) => {
    const { messages } = this.state;
    this.setState({
      messages: [createImageMessage(uri), ...messages],
    });
  }
  
  render() {
    const { inputMethod } = this.state;
    return (
      <View style={styles.container}>
        <Status />
        <MeasureLayout>
          {layout => (
            <KeyboardState layout={layout}>
              {keyboardInfo => (
                <MessagingContainer
                  {...keyboardInfo}
                  inputMethod={inputMethod} onChangeInputMethod={this.handleChangeInputMethod} renderInputMethodEditor={
                    this.renderInputMethodEditor}>
                  {this.renderToolbar()} </MessagingContainer>
              )}
            </KeyboardState>
          )}
        </MeasureLayout>
        {this.renderFullscreenImage()} </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  }
});