import { Image, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import React from 'react';
import NavigationBar from '../components/NavigationBar';

export default function ImageDetail({
    style, imageSource, onClose
}) {
    return (
        <SafeAreaView style={style}>
            <NavigationBar
                title="Comments"
                leftText="Close"
                onPressLeftText={onClose}
            />
            
            <ImageZoom cropWidth={Dimensions.get('window').width}
                cropHeight={Dimensions.get('window').height}
                imageWidth={200}
                imageHeight={200}>
                <Image style={StyleSheet.absoluteFill}
                    source={{ uri: imageSource }} />
            </ImageZoom>
        </SafeAreaView>
    );
}


