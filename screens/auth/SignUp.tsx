import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, TouchableHighlight, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import { AuthContext } from '../../context/AuthContext';
import Colors from '../../constants/Colors';
import { Image, Avatar } from 'react-native-elements'

import {

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
    RotatedBox
} from '../../shared';
import { FirebaseUpload } from '../../components/FirebaseUpload';
// import { FirebaseUpload } from '../../components';
const { height, width } = Dimensions.get('window');

const SignUp: React.FC = () => {
    const { user, register } = useContext(AuthContext)
    console.log('user :', user);

    const [emailForm, setEmailForm] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [avatar, setAvatar] = React.useState('');

    useEffect(() => {
        if (user?.avatar) setAvatar(user.avatar)
    }, [user])



    return (

        <TopCentered>
            <Centered>
                <Text>{titles.register}</Text>
            </Centered>
            {avatar ?
                <Centered>

                    <Avatar
                        rounded
                        size="xlarge"
                        activeOpacity={0.7}
                        source={{ uri: avatar }}
                        showEditButton={true}
                    />
                    {/* <Image
                        resizeMode="contain"
                        source={{ uri: avatar }}
                        style={styles.coverImage}
                        PlaceholderContent={<ActivityIndicator />}
                    /> */}
                </Centered> :
                <View style={styles.photo}

                >
                    <FirebaseUpload type="profile" />
                </View>}
            <TextInput placeholder={placeholders.email}
                onChangeText={emailForm => setEmailForm(emailForm)}
                value={emailForm}
            />
            <TextInput placeholder={placeholders.username}
                onChangeText={username => setUsername(username)}
                value={emailForm}
            />
            <TextInput placeholder={placeholders.firstName}
                onChangeText={firstName => setFirstName(firstName)}
                value={firstName}
            />
            <TextInput placeholder={placeholders.lastName}
                onChangeText={lastName => setLastName(lastName)}
                value={lastName}
            />
            <TextInput placeholder={placeholders.password} password
                onChangeText={password => setPassword(password)}
                value={password} />
            <Button
                onPress={() => register(user.avatar, emailForm, username, firstName, lastName, password)}
            >
                <Text color={colors.bright}>{buttons.register}</Text>
            </Button>

        </TopCentered>
    )
}
export default SignUp


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