import * as React from "react";
import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableHighlight, TextInput, Button, ScrollView } from 'react-native';
import { EventLib } from '../../@types/index'
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import Colors from "../../constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { LocationContext } from "../../context/LocationContext";
import { useContext } from "react";
import EventCategory from "./EventCategory";
import { markerImages } from '../../constants/Markers'
import { EventContext } from "../../context/EventContext";
import * as firebase from "firebase";
import { firebaseConfig } from "../../constants/config";



const { height, width } = Dimensions.get('window');



export const MarkerDetails: React.FC<EventLib.Event> =
    () => {
        const { marker, handleSetMarker, handleEventCUD } = useContext(EventContext)

        const [uri, setUri] = React.useState<string>(marker.img)
        const [progressUpload, setprogressUpload] = React.useState<number>(0)

        const { getAddress, eventAddress } = useContext(LocationContext)

        React.useEffect(() => {
            getAddress(marker.geometry.coordinates[0], marker.geometry.coordinates[1])
        }, [])

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

            const response = await fetch(result.uri);
            const blob = await response.blob();

            firebaseUpload(blob)
        }
        const firebaseUpload = async (file) => {
            // File or Blob named mountains.jpg
            firebase.initializeApp(firebaseConfig);

            // Create the file metadata
            var metadata = {
                contentType: 'image/jpeg'
            };
            const id = `${marker.title}-${marker.category}-${new Date()}`;

            const storageRef = firebase
                .storage()
                .ref()
                .child(`event/${id}`);
            // Upload file and metadata to the object 'images/mountains.jpg'
            var uploadTask = storageRef.child(`event/${id}`).put(file, metadata);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function (snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
                        console.log('File available at', img);
                        handleSetMarker({ ...marker, img })
                    });
                });
        }
        // const firebaseUpload = async (blob: Blob | ArrayBuffer) => {
        //     // const uri = this.props.issue.PICTURE_FILE
        //     firebase.initializeApp(firebaseConfig);

        //     const id = `${marker.title}-${marker.category}-${new Date()}`;
        //     // this.setState({ photoUploading: true })
        //     // const response = await fetch(uri);
        //     // const blob = await response.blob();
        //     console.log('blob :', blob);

        //     return new Promise((resolve, reject) => {
        //         const storageRef = firebase
        //             .storage()
        //             .ref()
        //             .child(`event/${id}`);

        //         const uploadTask = storageRef.put(blob)
        //         uploadTask.on('state_changed',
        //             snapshot => {
        //                 let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        //                 setprogressUpload(progress / 100);
        //                 console.log(progressUpload);
        //             },
        //             err => {
        //                 console.log('error', err)
        //                 reject()
        //             },
        //             () => {
        //                 uploadTask.snapshot.ref.getDownloadURL().then(img => {
        //                     //resolve(img)
        //                     console.log('downloadURL :', img);
        //                     handleSetMarker({ ...marker, img })

        //                 })
        //             }
        //         )
        //     })
        // }

        const { title, body, geometry, category, id, img } = marker

        return (
            <ScrollView style={styles.container} >

                {img ?
                    <View>
                        <Image
                            source={{ uri: img }}
                            style={styles.coverImage}
                            PlaceholderContent={<ActivityIndicator />}
                        />
                    </View> :
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
                }
                <View style={styles.formContainer} >

                    <View style={styles.form}>
                        {eventAddress ? <Text style={styles.address}>
                            {eventAddress.formatted}</Text> :
                            <Text>Loading Address</Text>}
                        <Text style={styles.address}>
                            lat:{geometry.coordinates[0].toFixed(2)}, long:{geometry.coordinates[1].toFixed(2)}</Text>
                    </View>


                    <View style={styles.form}>
                        <Text>Title</Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={title => handleSetMarker({ ...marker, title })}
                            value={title}
                        />
                    </View>

                    <View style={styles.form}>
                        <Text>Description</Text>
                        <TextInput
                            style={{ height: 80, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={body => handleSetMarker({ ...marker, body })}
                            value={body}
                        />
                    </View>
                    {category ?
                        <Image
                            source={markerImages[category]}
                            style={{ width: 50, height: 50 }}
                        /> :
                        <EventCategory />}
                </View>
                {id ? <Button
                    onPress={() => handleEventCUD('update')}
                    // style={styles.button}
                    title="Update"
                //color="#841584"
                />
                    : <Button
                        onPress={() => handleEventCUD('create')}
                        // style={styles.button}
                        title="Create"
                    //color="#841584"
                    />
                }
            </ScrollView>
        )

    }
const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingBottom: 20,
        height

    },
    formContainer: {
        flex: 1,
        flexDirection: "column",
        paddingTop: 50,
        width: '80%',
        alignItems: 'center',
        alignContent: "center",
        justifyContent: "space-between"
    },
    insideText: {
        fontWeight: 'bold',
        color: 'white',

        position: 'absolute',
        bottom: 0,
        textAlign: 'center',
        fontSize: 18,

    },
    form: {
        width: '100%'
    },
    bodyText: {


    },
    photoIcons: {
        height: height / 4,
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
    icon: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    title: {
        fontSize: 20,
        color: Colors.primary,
        lineHeight: 24,
        textAlign: 'center',
    },
    address: {
        fontSize: 15,
        color: Colors.secondary,
        lineHeight: 24,
        textAlign: 'center',
    },
    text: {
        fontSize: 15,
        lineHeight: 20,
        textAlign: 'center',
    },
})
// import React from 'react'
// import {
//     ScrollView,
//     View,
//     StyleSheet,
//     Image,
//     Text,
//     Button
// } from 'react-native';
// import { clearMarker, verifyIssue } from '../redux/actions/issuesActions'
// import Colors from '../constants/Colors';


// class IssueDetails extends React.Component {

//     handleVerify = () => {
//         const issueID = this.props.marker.id
//         this.props.verifyIssue(issueID)
//     }
//     render() {
//         const { marker, clearMarker } = this.props
//         console.log('marker :', marker);
//         return (
//             <View style={styles.container} >
//                 {/* <ScrollView style={styles.container}> */}

//                 {marker.imageUrls && <Image
//                     source={{ uri: marker.imageUrls[0] }}
//                     style={styles.image}
//                 />}

//                 <View style={styles.view} >
//                     <Text style={styles.title}>
//                         {marker.category}</Text>
//                     <Text style={styles.text}>{marker.description}</Text>
//                 </View>
//                 <View style={styles.buttonContainer}>
//                     <Button
//                         style={styles.button}
//                         onPress={clearMarker}
//                         title="Back"
//                         color="#841584"
//                         accessibilityLabel="Back"
//                     />
//                     <Button
//                         style={styles.button}
//                         onPress={this.handleVerify}
//                         title="Verify"
//                         color="#841584"
//                         accessibilityLabel="Verify"
//                     />
//                 </View>
//                 {/* </ScrollView> */}
//             </View>
//         )
//     }
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Colors.background,
//         alignItems: 'center',
//         justifyContent: 'space-evenly'
//     },
//     title: {
//         fontSize: 20,
//         color: Colors.primary,
//         lineHeight: 24,
//         textAlign: 'center',
//     },
//     text: {
//         fontSize: 15,
//         lineHeight: 20,
//         textAlign: 'center',
//     },
//     view: {

//     },
//     buttonContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'flex-end'
//     },
//     button: {
//         flex: .2,
//         backgroundColor: Colors.primary,
//     },
//     image: { width: 400, height: 400 }
// })


// const mapStateToProp = (state) => {
//     return {

//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         clearMarker: () => dispatch(clearMarker()),
//         verifyIssue: issueID => dispatch(verifyIssue(issueID)),

//     }
// }
// export default connect(mapStateToProp, mapDispatchToProps)(IssueDetails)

