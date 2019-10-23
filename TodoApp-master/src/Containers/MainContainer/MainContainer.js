import React, {Component} from 'react';
import {Text, View, StatusBar, Button} from 'react-native';
import {inject, observer} from 'mobx-react';

import styles from './MainContainer.style';

import CardView from '../../Components/CardView/CardView';


@inject('counterStore', 'todoStore')
@observer
export default class MainContainer extends Component {

	componentDidMount() {
		console.log("MainContainer > componentDidMount");
		console.log(this.props);
	}
	

	componentWillUnmount = () => {
		this.props.todoStore.saveTodo();
	};

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Text style={styles.appTitle}>{this.props.counterStore.getSum}</Text>
				<Button onPress={this.props.counterStore.increase} title={'Increase'} />
				<Button onPress={this.props.counterStore.decrease} title={'Decrease'}/>
				<CardView />
			</View>
		);
	}
}
