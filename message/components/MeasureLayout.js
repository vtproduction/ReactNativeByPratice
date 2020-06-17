import { Constants } from 'expo'; 
import { Platform, StyleSheet, View } from 'react-native'; 
import PropTypes from 'prop-types'; 
import React from 'react'

export class MeasureLayout extends React.Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    };
    state = {
        layout: null,
    }
		
		handleLayout = event => {
			const {nativeEvent: {layout}} = event
			this.setState({
				layout: {
					...layout,
					y: layout.y +(Platform.OS === 'android' ? 24 : 48),
				},
			})
		}

    render() {
			const { children } = this.props; const { layout } = this.state;
			if (!layout) {
				return (
					<View onLayout={this.handleLayout} style={styles.container} />
				);
			}
			return children(layout);
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default MeasureLayout
