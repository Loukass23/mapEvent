import React from 'react'
import { Text, View, Button, StyleSheet, Alert, TouchableHighlight } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons';

interface Props {

}

const EventScreen: React.FC<Props> = () => {

    const onChooseImagePress = async () => {
        // let result = await ImagePicker.launchCameraAsync();
        let result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
            console.log(result);
            // this.handleUpload(result.uri, 'test-image')
            //     .then(() => {
            //         Alert.alert("Success");
            //     })
            //     .catch((error) => {
            //         Alert.alert(error);
            //     });
        }
    }
    const onChooseCameraPress = async () => {
        let result = await ImagePicker.launchCameraAsync();

        if (!result.cancelled) {
            console.log(result);
            // this.handleUpload(result.uri, 'test-image')
            //     .then(() => {
            //         Alert.alert("Success");
            //     })
            //     .catch((error) => {
            //         Alert.alert(error);
            //     });
        }
    }
    const imageUpload = async (uri) => {

        const response = await fetch(uri);
        const blob = await response.blob();
        console.log('blob :', blob);
    }

    return (

        <View style={styles.container}>
            <View style={styles.photoIcons}>
                <TouchableHighlight
                    onPress={onChooseImagePress}
                    style={styles.icon}
                >
                    <Ionicons

                        name='md-image'
                        color='grey'
                        size={64}

                    />
                    {/* <Icon name="md-arrow-back"
                    type='ionicons'
                    color="grey" /> */}
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.icon}
                    onPress={onChooseCameraPress}
                >
                    <Ionicons
                        name='md-camera'
                        color='grey'
                        size={64}

                    />
                    {/* <Icon name="md-arrow-back"
                    type='ionicons'
                    color="grey" /> */}
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: "center",
    },
    photoIcons: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        alignContent: 'stretch'
    },
    icon: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    }
});

export default EventScreen
/*
import React from 'react';
import { Image, StyleSheet, Button, Text, View, Alert, } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import * as firebase from 'firebase';

export default class IssuesScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    onChooseImagePress = async () => {
        let result = await ImagePicker.launchCameraAsync();
        //let result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
            console.log(result);
            this.handleUpload(result.uri, 'test-image')
                .then(() => {
                    Alert.alert("Success");
                })
                .catch((error) => {
                    Alert.alert(error);
                });
        }
    }
    handleUpload = (uri, imageName) => {
        const storageService = firebase.storage();
        const storageRef = storageService.ref();

        fetch(uri).then(res => {
            console.log(res);
            const blob = res._bodyBlob
            const uploadTask = storageRef.child(`images/${imageName}`).put(blob); //create a child directory called images, and place the file inside this directory

            uploadTask.on('state_changed', (snapshot) => {

                let prog = Math.round(snapshot.bytesTransferred * 100 / snapshot.totalBytes)
                // this.setState({ progress: prog, buffer: 100 });
                console.log('progress', prog)

            }, (error) => {

                console.log(error);
            }, () => {
                console.log('success');
                // this.setState({ isUploading: false, progress: 100, })
                firebase
                    .storage()
                    .ref("images")
                    .child(`${imageName}`)
                    .getDownloadURL()
                    .then(url => console.log({ photoURL: url }));

            });

        })



        //console.log(uri)
        //this.setState({ isUploading: true, progress: 0 })


    }

    uploadImage = async (uri, imageName) => {
        console.log(imageName);
        const response = await fetch(uri);
        const blob = await response.blob();
        console.log(blob)
        var ref = firebase.storage().ref().child('images/' + imageName);
        return ref.put(blob);
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Choose image..." onPress={this.onChooseImagePress} />
            </View>
        );
    }
}


*/