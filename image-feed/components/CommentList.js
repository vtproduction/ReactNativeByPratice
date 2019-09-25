import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

export default class CommentList extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDeleteComment: PropTypes.func.isRequired
  };

  handleDeleteCommentBtn = (item, index) => {
    this.props.onDeleteComment(item, index);
  };

  renderItem = (item, index) => (
    <View key={index} style={styles.comment}>
      <Text>{item}</Text>
      <TouchableOpacity onPress={() => this.handleDeleteCommentBtn(item, index)}>
        <Text style={styles.deleteText}>delete</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    const { items } = this.props;
    

    return <ScrollView>{items.map(this.renderItem)}</ScrollView>;
  }
}

const styles = StyleSheet.create({
  deleteText: {
    color: "red",
  },
  comment: {
    marginLeft: 20,
    paddingVertical: 20,
    paddingRight: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
