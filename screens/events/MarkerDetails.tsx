import * as React from "react";
import { StyleSheet, View, ImageBackground, Dimensions, TouchableHighlight, ScrollView, ProgressBarAndroid, TouchableOpacity } from 'react-native';
import { EventLib } from '../../@types/index'
import { ActivityIndicator } from 'react-native';
import { Image, Avatar } from 'react-native-elements';
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
import { FirebaseUpload } from "../../components/FirebaseUpload";

import {
    Container,
    Centered,
    TopCentered,
    Left,
    TextInput,
    Button,
    Text,
    titles,
    colors,
    placeholders,
    routes,
    buttons,
    RotatedBox,
    messages,
    ContainerRow,
    TextSmall
} from '../../shared';
import { MenuButton } from "../../components";
import { AuthContext } from "../../context/AuthContext";


const { height, width } = Dimensions.get('window');



export const MarkerDetails: React.FC<EventLib.Event> =
    () => {
        const { marker, handleSetMarker, handleEventCUD } = useContext(EventContext)
        const { user } = useContext(AuthContext)
        const { getAddress, eventAddress } = useContext(LocationContext)

        React.useEffect(() => {
            getAddress(marker.geometry.coordinates[0], marker.geometry.coordinates[1])
        }, [])

        const { title, body, geometry, category, id, img } = marker

        return (

            <Container>
                {img ?

                    <Image
                        source={{ uri: img }}
                        style={styles.coverImage}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                    :
                    <View style={styles.coverImage}>
                        <FirebaseUpload type="event" />
                    </View>
                }
                <TopCentered>
                    <Centered>
                        {eventAddress ? <TextSmall>
                            {eventAddress.formatted}</TextSmall> :
                            <TextSmall>Loading Address</TextSmall>}
                        <TextSmall>
                            lat:{geometry.coordinates[0].toFixed(2)}, long:{geometry.coordinates[1].toFixed(2)}
                        </TextSmall>
                    </Centered>
                    <Text>Title</Text>
                    <TextInput
                        style={{ borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={title => handleSetMarker({ ...marker, title })}
                        value={title}
                    />
                    <Text>Description</Text>
                    <TextInput
                        style={{ height: 80, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={body => handleSetMarker({ ...marker, body })}
                        value={body}
                    />
                    {category ?
                        <Centered >
                            <Avatar
                                rounded
                                size="large"
                                activeOpacity={0.7}
                                source={markerImages[category]}
                                showEditButton={true}
                            />
                            <Text>{category}</Text>
                        </Centered> :
                        <EventCategory />}
                </TopCentered>
{user ? <React.Fragment>
                {id ?
                    <Button
                        onPress={() => handleEventCUD('update')}
                    >
                        <Text> {buttons.update} </Text>
                    </Button>

                    : <Button
                        onPress={() => handleEventCUD('create')}
                    >
                        <Text> {buttons.create} </Text>
                    </Button>
                }
                </React.Fragment> :
                    <Container>
                      
                        <Text >Log in first</Text>
                    </Container>}
            </Container>
        )
    }
const styles = StyleSheet.create({
    coverImage: {
        zIndex: 9999,
        resizeMode: 'center',
        height: height * 0.3,
        width: width,
        position: 'relative',
        top: 0,
        left: 0,
    },
})