import * as React from "react";
import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableHighlight } from 'react-native';
import { EventLib } from '../../@types/index'
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import Colors from "../../constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { LocationContext } from "../../context/LocationContext";
import { useContext } from "react";



const { height, width } = Dimensions.get('window');



export const MarkerDetails: React.FC<EventLib.Event> =
    (marker: EventLib.Event) => {
        const [uri, setUri] = React.useState<string>(marker.img)

        const { getAddress, eventAddress } = useContext(LocationContext)

        React.useEffect(() => {
            console.log('marker :', marker);
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


        return (
            <View style={styles.container} >

                {uri ?
                    <View>
                        <Image
                            source={{ uri }}
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
                <Text style={styles.title}>
                    {marker.title}</Text>
                {eventAddress &&
                    <Text style={styles.address}>
                        {eventAddress.formatted}</Text>

                }


                <Text style={styles.text}>{marker.body}</Text>

                <Text style={styles.bodyText} >{marker.category}</Text>
            </View>
        )

    }
const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 10,

    },
    insideText: {
        fontWeight: 'bold',
        color: 'white',

        position: 'absolute',
        bottom: 0,
        textAlign: 'center',
        fontSize: 18,

    },
    bodyText: {


    },
    photoIcons: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        alignContent: 'stretch'
    },
    coverImage: {
        resizeMode: 'center',
        height: 400,
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

