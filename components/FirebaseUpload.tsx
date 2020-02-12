import * as React from "react";
import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableHighlight, TextInput, Button, ScrollView, ProgressBarAndroid } from 'react-native';
import { EventLib } from '../@types/index'
import Colors from "../constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { useContext } from "react";
import { EventContext } from "../context/EventContext";
import * as firebase from "firebase";
import { firebaseConfig } from "../constants/config";
import { AuthContext } from "../context/AuthContext";



const { height, width } = Dimensions.get('window');

type Props = {
    type: string,

}

export const FirebaseUpload: React.FC<Props> =
    ({ type }) => {
        const { marker, handleSetMarker, } = useContext(EventContext)
        const { user, handleSetUser, } = useContext(AuthContext)

        const [progressUpload, setprogressUpload] = React.useState<number>(0)
        const [uploading, setUploading] = React.useState<boolean>(false)


        const onChooseImagePress = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });
            if (!result.cancelled) {
                imageUpload(result)
            }
        }

        const onChooseCameraPress = async () => {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });

            if (!result.cancelled) {
                setUploading(true)
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
            const response = await fetch(result.uri);
            const blob = await response.blob();

            firebaseUpload(blob)
        }
        const firebaseUpload = async (file) => {
            // File or Blob named mountains.jpg


            // Create the file metadata
            var metadata = {
                contentType: 'image/jpeg'
            };
            let id: string
            if (type === 'event')
                id = `${marker.geometry.coordinates[0].toFixed(5)}-${marker.geometry.coordinates[0].toFixed(5)}-${new Date()}`;
            else if (type === 'profile')
                id = `user-join-${new Date()}`;
            else id = new Date().getTime().toString()
            const storageRef = firebase
                .storage()
                .ref()
                .child(`${type}/${id}`);
            // Upload file and metadata to the object 'images/mountains.jpg'
            var uploadTask = storageRef.child(`event/${id}`).put(file, metadata);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function (snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setprogressUpload(progress)
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, (error) => {
                    console.log('error :', error);

                }, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(img => {
                        setUploading(false)
                        setprogressUpload(0)
                        console.log('File available at', img);
                        if (type === 'event') handleSetMarker({ ...marker, img })
                        if (type === 'profile') handleSetUser({ ...user, avatar: img })
                    });
                });
        }
        return (
            <View style={styles.container} >
                {uploading ?
                    <React.Fragment>
                        <ProgressBarAndroid
                            style={{ padding: 10 }}
                            styleAttr="Normal"
                            indeterminate={false}
                            progress={progressUpload}
                        />
                        <Text style={styles.progress}>{progressUpload.toFixed(0)}%</Text>
                    </React.Fragment> :
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
                        </TouchableHighlight>
                    </View>}
            </View>
        )
    }
const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flex: 1,
        flexDirection: 'column',
        alignContent: 'space-around',
        justifyContent: 'space-evenly',
    },
    progress: {
        textAlign: 'center',
        color: Colors.primary
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
    },
})