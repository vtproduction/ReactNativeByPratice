import {
  ActivityIndicator,
  Text,
  ViewPropTypes,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { fetchImages } from '../utils/api';
import CardList from '../components/CardList';

export default class Feed extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style,
    commentsForItem: PropTypes.objectOf(
      PropTypes.arrayOf(PropTypes.string)
    ).isRequired,
    onPressComments: PropTypes.func.isRequired,
    onPressImage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: null,
  };

  state = {
    loading: true,
    error: false,
    items: [],
  };

  async componentDidMount() {
    try {
      const items = await fetchImages();
      
      this.setState({
        loading: false,
        items,
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  }

  render() {
    const { commentsForItem, onPressComments, style, onPressImage } = this.props;
    const { loading, error, items } = this.state;

    if (loading) {
      return <ActivityIndicator size="large" style={style} />;
    }

    if (error) {
      return <SafeAreaView style={style}>
        <Text>Error!</Text>
      </SafeAreaView>;
    }

    return (
      <SafeAreaView style={style}>
        <CardList items={items} commentsForItem={commentsForItem} onPressComments={onPressComments} onPressImage={onPressImage}/>
      </SafeAreaView>
    );
  }
}
