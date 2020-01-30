import React, { useState, useContext } from 'react'
import { Image, View, Button, StyleSheet, Text, TouchableHighlight, TextInput, FlatList } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons';
import { ImageInfo } from '../@types';
import MenuButton from '../components/navigation/MenuButton';
import { ListItem } from 'react-native-elements';
import { AuthContext } from '../context/AuthContext';

interface Props {
    navigation: any
}

const LogInScreen: React.FC<Props> = ({ navigation }) => {
    const { logIn, user } = useContext(AuthContext)


    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    const handleLogInPress = () => {
        logIn(email.toLowerCase(), password)

    }

    return (

        <View style={styles.container}>
            {!user ? <View style={styles.form}>
                <Text>Email</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={email => setEmail(email)}
                    value={email}
                />
                <Text>Password</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={password => setPassword(password)}
                    value={password}
                />
                <TextInput
                    value={'this.state.inputValue'}
                    style={styles.input}
                    placeholder="Enter something here"
                // onChangeText={this.handleTextChange}
                />

                <Button
                    onPress={() => handleLogInPress()}
                    // style={styles.button}
                    title="Log In"
                    color="#841584"
                />
            </View> :
                <View style={styles.form}>
                    <Text style={styles.text}>{user.username}</Text>
                    <Text style={styles.text}>{user.email}</Text>
                    <Text style={styles.text}>{user.firstName}  {user.lastName}</Text>
                </View>
            }


        </View>
    )
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     paddingTop: 50,
    //     alignItems: "center",
    //     justifyContent: "space-between"

    // },
    container: {
        flex: 1,
        padding: 30,
    },
    input: {
        flex: 2,
    },
    text: {
        textAlign: "center"

    },
    form: {
        paddingBottom: 10,
        flexDirection: 'column',
        justifyContent: 'space-around'
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

export default LogInScreen
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