import React, { useContext } from 'react'


import {
    StyleSheet,
    Alert,
    TouchableOpacity,
    Image,
    Text,
    View,
    ScrollView
} from 'react-native'
import { markers } from '../../constants/Markers';
import Colors from "../../constants/Colors";
import { EventContext } from '../../context/EventContext';


const EventCategory: React.FC = () => {

    const { marker, handleSetMarker } = useContext(EventContext)
    return (
        <View style={styles.container}>

            <ScrollView>
                <Text style={styles.text}> Please choose a category </Text>
                <View style={styles.catContainer}>

                    {markers.map(markerImg => {
                        return (
                            <TouchableOpacity key={markerImg.name} style={styles.categoryTouch} onPress={() => handleSetMarker({ ...marker, category: markerImg.name })}>
                                <Image
                                    style={{
                                        width: 50,
                                        height: 50,
                                        resizeMode: 'contain',
                                    }}
                                    source={markerImg.image}
                                />
                                <Text style={styles.text2}>{markerImg.name}</Text>
                            </TouchableOpacity>
                        )
                    })}

                </View>
            </ScrollView>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 20
    },
    categoryTouch: {

        justifyContent: 'space-around',
        alignContent: 'center',
    },
    catContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignContent: 'center',
        paddingHorizontal: 10
    },
    button: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: 'skyblue',
        height: 100,
        width: 100,
        margin: 10
    },

    text: {
        fontSize: 20,
        lineHeight: 25,
        textAlign: 'center',
        color: Colors.primary
    },
    text2: {
        fontSize: 15,
        lineHeight: 20,
        textAlign: 'center',
        color: Colors.secondary
    },

})


export default EventCategory

