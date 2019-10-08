import { PanResponder } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

export default class Draggable extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    onTouchStart: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchEnd: PropTypes.func,
    enabled: PropTypes.bool,
  };

  static defaultProps = {
    onTouchStart: () => {},
    onTouchMove: () => {},
    onTouchEnd: () => {},
    enabled: true,
  };

  handleStartShouldSetPanResponder = () => {
    const { enabled } = this.props;
    return enabled;
  }

  handlePanResponderGrant = () => {
    const { onTouchStart } = this.props;
    this.setState({ dragging: true }); 
    onTouchStart();
  }

  handlePanResponderMove = (e, gestureState) => {
    const { onTouchMove } = this.props;
    // Keep track of how far we've moved in total (dx and dy)
    const offset = {
      top: gestureState.dy, 
      left: gestureState.dx,
    };
    onTouchMove(offset);
  }

  handlePanResponderEnd = (e, gestureState) => {
    const { onTouchMove, onTouchEnd } = this.props;
    const offset = {
      top: gestureState.dy, 
      left: gestureState.dx,
    };
    this.setState({
      dragging: false,
    });
    onTouchMove(offset);
    onTouchEnd(offset);
  }

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder, 
      onPanResponderGrant: this.handlePanResponderGrant, 
      onPanResponderMove: this.handlePanResponderMove, 
      onPanResponderRelease: this.handlePanResponderEnd, 
      onPanResponderTerminate: this.handlePanResponderEnd,
    });
  }
  render() {
    const { children } = this.props; 
    const { dragging } = this.state;
    // Update children with the state of the drag
    return children({
      handlers: this.panResponder.panHandlers, dragging,
    })
  }
}
