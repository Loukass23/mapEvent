import * as React from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

type CardProps = {
    Title: string
    Img?: string
    Body: string
}

export const MyCard: React.FC<CardProps> =
    ({ Title, Img, Body }) => (
        <View style={styles.container} >

            {Image &&
                // <Image
                //     source={{ uri: Img }}
                //     style={styles.welcomeImage}
                // >
                //     <Text>{Title}</Text>
                // </Image>
                <ImageBackground
                    source={{ uri: Img }}
                    style={styles.coverImage}>
                    <Text style={styles.insideText}>Inside</Text>
                </ImageBackground>
            }
            <Text style={styles.bodyText} >{Body}</Text>
        </View>
    )


const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

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
    coverImage: {
        resizeMode: 'center',
        height: 400,
        width: width,
        position: 'relative',
        top: 0,
        left: 0,


    }
})