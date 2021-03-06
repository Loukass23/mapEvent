import React, { useState, useContext } from 'react'
import { View, Button, StyleSheet, Text, TouchableHighlight, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Dimensions, KeyboardAvoidingView } from 'react-native'
import { Image } from 'react-native-elements';
import MenuButton from '../components/navigation/MenuButton';
import { AuthContext } from '../context/AuthContext';
import Colors from '../constants/Colors';
import { FirebaseUpload } from '../components/FirebaseUpload';

const { height, width } = Dimensions.get('window');

interface Props {
    navigation: any
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const { logIn, user, register, handleSetUser } = useContext(AuthContext)
    console.log('user :', user);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');


    const handleLogInPress = () => {
        logIn(email.toLowerCase(), password)

    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <MenuButton navigation={navigation} />
            {user ?
                <View style={styles.photo}>
                    <Image
                        resizeMode="contain"
                        source={{ uri: user.avatar }}
                        style={styles.coverImage}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                </View> :
                <View style={styles.photo}

                >
                    <FirebaseUpload type="profile" />
                </View>}
            <TextInput style={styles.input}
                autoCompleteType="email"
                underlineColorAndroid="transparent"
                placeholder="Email"
                placeholderTextColor="black"
                autoCapitalize="none"
                onChangeText={email => setEmail(email)}
                value={email}
            />
            <TextInput style={styles.input}
                autoCompleteType="username"
                underlineColorAndroid="transparent"
                placeholder="Username"
                placeholderTextColor="black"
                autoCapitalize="none"
                onChangeText={username => setUsername(username)}
                value={username}
            />
            <TextInput style={styles.input}
                autoCompleteType="name"
                underlineColorAndroid="transparent"
                placeholder="First Name"
                placeholderTextColor="black"
                autoCapitalize="none"
                onChangeText={firstName => setFirstName(firstName)}
                value={firstName}
            />
            <TextInput style={styles.input}
                autoCompleteType="name"
                underlineColorAndroid="transparent"
                placeholder="Last Name"
                placeholderTextColor="black"
                autoCapitalize="none"
                onChangeText={lastName => setLastName(lastName)}
                value={lastName}
            />
            <TextInput style={styles.input}
                autoCompleteType="password"
                underlineColorAndroid="transparent"
                placeholder="Password"
                placeholderTextColor="black"
                autoCapitalize="none"
                onChangeText={password => setPassword(password)}
                value={password}
            />
            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => register(user.avatar, email, username, firstName, lastName, password)}
            >
                <Text style={styles.submitButtonText}> REGISTER </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}
export default RegisterScreen


const styles = StyleSheet.create({
    container: {
        paddingTop: 40
    },
    photo: {
        height: height / 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        alignContent: 'stretch'
    },
    coverImage: {
        resizeMode: 'center',
        height: height / 4,
        width: width,
        position: 'relative',
        top: 0,
        left: 0,


    },
    input: {
        margin: 15,
        height: 40,
        borderColor: Colors.primary,
        borderWidth: 1,
        paddingLeft: 5
    },
    text: {
        padding: 10,
        textAlign: 'center',
        margin: 15,
        height: 40,
        borderColor: Colors.secondary,
        color: 'black',
        borderWidth: 1
    },
    submitButton: {

        backgroundColor: Colors.primary,
        padding: 10,
        margin: 15,
        height: 40,
        bottom: 5,
        textAlign: 'center',
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center'
    }
})
//     return (

//         <View style={styles.maincontainer}>
//             <MenuButton navigation={navigation} />
//             <Text style={styles.title}>Sign In</Text>
//             <View style={styles.container}>



//                 {!user ? <View style={styles.form}>
//                     <Text>Email</Text>
//                     <TextInput
//                         style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
//                         onChangeText={email => setEmail(email)}
//                         value={email}
//                     />
//                     <Text>Password</Text>
//                     <TextInput
//                         style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
//                         onChangeText={password => setPassword(password)}
//                         value={password}
//                     />


//                     <Button
//                         onPress={() => handleLogInPress()}
//                         // style={styles.button}
//                         title="Log In"
//                     //color="#841584"
//                     />
//                 </View> :
//                     <View style={styles.form}>
//                         <Text style={styles.text}>{user.username}</Text>
//                         <Text style={styles.text}>{user.email}</Text>
//                         <Text style={styles.text}>{user.firstName}  {user.lastName}</Text>

//                         <Button
//                             // style={styles.button3}
//                             onPress={() => signOut()}
//                             title="LOG OUT"
//                             // color={Colors.primary}
//                             accessibilityLabel="Log Out"
//                         />

//                     </View>
//                 }
//             </View>

//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     maincontainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignContent: "center",
//         alignItems: "center",
//         // backgroundColor: Colors.background,
//     },
//     title: {
//         fontSize: 20,
//         textAlign: "center",
//         margin: 10
//     },
//     container: {
//         flex: 1,
//         flexDirection: "column",
//         paddingTop: 50,
//         width: '80%',
//         alignItems: 'center',
//         alignContent: "center",
//         justifyContent: "space-between"
//     },

//     input: {
//         flex: 2,
//     },
//     text: {
//         textAlign: "center"

//     },
//     form: {

//         width: '100%'
//         // flexDirection: 'column',
//         // justifyContent: 'space-around'
//     },

//     photoIcons: {

//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'stretch',
//         alignContent: 'stretch'
//     },
//     stylePicture: {
//         width: '100%',
//     },
//     img: { width: 400, height: 400 }
//     ,
//     icon: {
//         flex: 1,
//         alignSelf: 'center',
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignContent: 'center'
//     }
// });


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