import React, { useState } from 'react'
import { Image, View, Button, StyleSheet, Text, TouchableHighlight, TextInput } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons';
import { ImageInfo } from '../@types';
import MenuButton from '../components/navigation/MenuButton';

interface Props {
    navigation: any
}

const EventScreen: React.FC<Props> = ({ navigation }) => {

    const [value, onChangeText] = React.useState('Useless Placeholder');
    const [uri, setUri] = useState<string>()


    const onChooseImagePress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.cancelled) {
            console.log(result);

            imageUpload(result)
        }
        // if (!result.cancelled) {
        //     const foo: string = result.uri
        //     this.handleUpload(foo.uri, 'test-image')
        //         .then(() => {
        //             Alert.alert("Success");
        //         })
        //         .catch((error) => {
        //             Alert.alert(error);
        //         });
        // }
    }

    const onChooseCameraPress = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            console.log(result);

            imageUpload(result)
            //     .then(() => {
            //         Alert.alert("Success");
            //     })
            //     .catch((error) => {
            //         Alert.alert(error);

            //     });
        }

    }
    const imageUpload = async (result: any) => {
        const { uri } = result
        setUri(uri)
        console.log('uri :', uri);
        const response = await fetch(result.uri);
        const blob = await response.blob();
        console.log('blob :', blob);
    }

    // const firebaseUpload = async () => {
    //     const uri = this.props.issue.PICTURE_FILE
    //     const id = `${this.props.location.ADDRESS.city}-${this.props.issue.CATEGORY}-${new Date()}`;
    //     this.setState({ photoUploading: true })
    //     const response = await fetch(uri);
    //     const blob = await response.blob();
    //     console.log('blob :', blob);

    //     return new Promise((resolve, reject) => {
    //         const storageRef = firebase
    //             .storage()
    //             .ref()
    //             .child(`issues/${id}`);
    //         const uploadTask = storageRef.put(blob)
    //         uploadTask.on('state_changed',
    //             snapshot => {
    //                 let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    //                 this.setState({ progress: progress / 100 });
    //                 console.log(this.state.progress);
    //             },
    //             err => {
    //                 console.log('error', err)
    //                 reject()
    //             },
    //             () => {
    //                 uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
    //                     console.log('downloadURL :', downloadURL);
    //                     resolve(downloadURL)
    //                 })
    //             }
    //         )
    //     })
    // }

    // const handleSubmitIssue = async () => {

    //     const { navigate } = this.props.navigation;
    //     const { CATEGORY, PICTURE_FILE } = this.props.issue;
    //     const { ADDRESS, USER_POSITION, POI_LOCATION, POI_ADDRESS } = this.props.location;
    //     const { description } = this.state

    //     const storageUrl = await this.firebaseUpload()
    //     console.log(storageUrl)

    //     console.log('photoURL :', storageUrl);
    //     let location
    //     if (POI_LOCATION) {
    //         location = {
    //             longitude: POI_LOCATION.longitude,
    //             latitude: POI_LOCATION.latitude,
    //             address: POI_ADDRESS.formatted
    //         }
    //     }
    //     else {
    //         location = {
    //             longitude: USER_POSITION.longitude,
    //             latitude: USER_POSITION.latitude,
    //             address: ADDRESS.formatted
    //         }
    //     }
    //     const issue = {
    //         imageUrls: [storageUrl],
    //         location,
    //         category: CATEGORY,
    //         description
    //     };
    //     this.props.postIssue(issue);
    //     this.props.clearPost()
    //     navigate('Maps')
    // }


    return (

        <View style={styles.container}>
            <Button
                title="Press me"
                color="#f194ff"
                onPress={() => console.log('Button with adjusted color pressed')}
            />
            {!uri ? <View style={styles.photoIcons}>
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
            </View> :
                <View style={styles.stylePicture}>
                    <Image
                        //style={{ height: 50, width: 50 }}
                        style={styles.img}
                        source={{ uri: uri }} />
                </View>}

            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />
            </View>
            <MenuButton navigation={navigation} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: "center",
        justifyContent: "space-between"

    },

    photoIcons: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        alignContent: 'stretch'
    },
    stylePicture: {
        width: '100%',
    },
    img: { width: 400, height: 400 }
    ,
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