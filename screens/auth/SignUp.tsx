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

const SignUp: React.FC<Props> = () => {
    const { user, register } = useContext(AuthContext)
    console.log('user :', user);

    const [emailForm, setEmailForm] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');



    return (

        <TopCentered>
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

