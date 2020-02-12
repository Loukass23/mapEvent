import React, { useState, useContext } from 'react'
import { View, StyleSheet, TouchableHighlight, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import { AuthContext } from '../../context/AuthContext';
import Colors from '../../constants/Colors';
//import { Input } from 'react-native-elements'

import {
    Container,
    Centered,
    TopCentered,
    Left,
    TextInput,
    Button,
    Text,
    titles,
    messages,
    colors,
    placeholders,
    routes,
    buttons,
    RotatedBox
} from '../../shared';
const { height, width } = Dimensions.get('window');
interface Props {
}

const SignIn: React.FC<Props> = () => {
    const { logIn, user, signOut } = useContext(AuthContext)
    console.log('user :', user);

    const [emailForm, setEmailForm] = React.useState('');
    const [password, setPassword] = React.useState('');


    const handleLogInPress = () => {
        logIn(emailForm.toLowerCase(), password)
    }


    return (

        <TopCentered>
            <Centered>
                <Text>{titles.login}</Text>
            </Centered>

            <TextInput placeholder={placeholders.email}
                onChangeText={emailForm => setEmailForm(emailForm)}
                value={emailForm}
            />
            <TextInput placeholder={placeholders.password} password
                onChangeText={password => setPassword(password)}
                value={password} />
            <Button onPress={() => handleLogInPress()}>
                <Text color={colors.bright}>{buttons.login}</Text>
            </Button>

        </TopCentered>
    )
}
export default SignIn

