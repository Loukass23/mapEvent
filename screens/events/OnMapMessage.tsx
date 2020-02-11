import React, { FC } from 'react';
import {
    StyleSheet, View, Image, Text
} from 'react-native';

interface Props {
    message: string
}
export const OnMapMessage: FC<Props> = ({ message }) => {

    return (
        <React.Fragment>
            <View style={styles.welcomeContainer}>
                <Image
                    source={require('../../assets/images/Galileo_logo_animation_3.gif')}
                    style={styles.welcomeImage}
                />
                <Text style={styles.text}>{message}</Text>
            </View >
        </React.Fragment>
    );
}

const styles = StyleSheet.create({

    welcomeContainer: {
        zIndex: 0,
        backgroundColor: 'rgba(250, 250, 250, .8)',
        position: 'absolute',//use absolute position to show button on top of the map
        top: 50, //for center align

        textAlign: 'center',
        // backgroundColor: '#fff',


        // flexDirection: "row",
        // textAlign: 'center',

        // alignItems: 'stretch',


    },
    welcomeImage: {

        top: 7,
        width: 30,
        height: 38,
        left: 10
    },
    text: {
        marginTop: 13,
        padding: 5,
        textAlign: 'center',
        alignItems: 'center',
        width: 200,
        height: 38,
        backgroundColor: 'rgba(255, 255, 255, .7)',
        color: 'grey'
    },
})



