import { ActivityIndicator, TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import AuthorRow from './AuthorRow';

export default class Card extends React.Component {
  static propTypes = {
    fullname: PropTypes.string.isRequired,
    image: Image.propTypes.source.isRequired,
    onImageClick: PropTypes.func.isRequired
  };

  state = {
    loading: true,
  };

  handleLoad = () => {
    this.setState({ loading: false });
  };

  handleImageClick = () =>{
    const {image, onImageClick} = this.props
    onImageClick(image.url)
  }

  render() {
    const { fullname, image, linkText, onPressLinkText } = this.props;
    const { loading } = this.state;

    return (
      <View>
        <AuthorRow
          fullname={fullname}
          linkText={linkText}
          onPressLinkText={onPressLinkText}
        />
        <View style={styles.image}>
          {loading && (
            <ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} />
          )}
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={this.handleImageClick}>
            <Image
              style={StyleSheet.absoluteFill}
              source={image}
              onLoad={this.handleLoad}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
});
