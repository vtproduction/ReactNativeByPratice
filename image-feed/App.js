import React from 'react';
import { AsyncStorage, Modal, StyleSheet, View, Text,Platform } from 'react-native';
import Constants from 'expo-constants';
import Feed from './screens/Feed';
import Comments from './screens/Comments';
import ImageDetail from './screens/ImageDetail';

export default class App extends React.Component {

  
  state = {
    commentsForItem: {}, 
    showModal: false, 
    showImageModal: false,
    selectedItemId: null,
    selectedImage: ""
  };

  openCommentScreen = id => {
    this.setState({
      showModal: true,
      selectedItemId: id,
    })
  }

  openImageScreen = url => {
    console.log(url)
    this.setState({
      selectedImage: url,
      showImageModal: true
    })
  }

  closeCommentScreen = () => {
    this.setState({
      showModal: false,
      selectedItemId: false
    })
  }

  closeImageScreen = () => {
    this.setState({
      showImageModal: false,
      selectedItemId: false
    })
  }

  onDeleteComment = async (item, index) => {
    console.log(item);
    console.log(index);

    const { selectedItemId, commentsForItem } = this.state;
    const comments = commentsForItem[selectedItemId] || [];
    if (comments.length > index) {
      comments.splice(index, 1)
    }

    const updated = {
      ...commentsForItem,
      [selectedItemId]: [...comments],
    };

    this.setState({
      commentsForItem: updated,
    });

    try {
      await AsyncStorage.setItem(
        ASYNC_STORAGE_COMMENTS_KEY,
        JSON.stringify(updated)
      )
    } catch (e) {
      console.log(
        'Failed to delete comment',
        text,
        'for',
        selectedItemId,
      );
    }

  }

  onSubmitComment = async text => {
    const {selectedItemId, commentsForItem} = this.state;
    const comments = commentsForItem[selectedItemId] || [];
    const updated = {
      ...commentsForItem,
      [selectedItemId] : [...comments, text],
    };

    this.setState({
      commentsForItem: updated,
    });

    try {
      await AsyncStorage.setItem(
        ASYNC_STORAGE_COMMENTS_KEY,
        JSON.stringify(updated)
      )
    } catch (e) {
      console.log(
        'Failed to save comment',
        text,
        'for',
        selectedItemId,
      );
    }
  }

  async componentDidMount() {
    try{
      const commentsForItem = await AsyncStorage.getItem(ASYNC_STORAGE_COMMENTS_KEY);
      this.setState({
        commentsForItem : commentsForItem ? JSON.parse(commentsForItem) : {},
      });
    }catch(e){
      console.log('Failed to load comments');
    }
  } 


  render(){
    const {commentsForItem, showModal, showImageModal, selectedItemId, selectedImage} = this.state;

    return (
      <View style={styles.container}>
        <Feed 
          style={styles.feed} 
          commentsForItem={commentsForItem} 
          onPressComments={this.openCommentScreen}
          onPressImage={this.openImageScreen}/>
        <Modal
          visible={showModal} animationType="slide" onRequestClose={this.closeCommentScreen}>
          <Comments
            style={styles.comments}
            comments={commentsForItem[selectedItemId] || []}
            onClose={this.closeCommentScreen}
            onSubmitComment={this.onSubmitComment}
            onDeleteComment={this.onDeleteComment}>
          </Comments>
        </Modal>
        <Modal
          visible={showImageModal} animationType="slide" onRequestClose={this.closeImageScreen}>
          <ImageDetail
            style={styles.comments}
            imageSource={selectedImage}
            onClose={this.closeImageScreen}>
          </ImageDetail>
        </Modal>
        
        
      </View>
      
    );
  }
}

const ASYNC_STORAGE_COMMENTS_KEY = 'ASYNC_STORAGE_COMMENTS_KEY';

const platformVersion = Platform.OS === 'ios'
  ? parseInt(Platform.Version, 10)
  : Platform.Version;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feed: {
    flex: 1,
    marginTop:
      Platform.OS === 'android' || platformVersion < 11
        ? Constants.statusBarHeight
        : 0,
  },
  comments: {
    flex: 1,
    marginTop:
      Platform.OS === 'ios' && platformVersion < 11
        ? Constants.statusBarHeight
        : 0,
  },
});



