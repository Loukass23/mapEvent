import React, { useState, useContext } from 'react'
import { View, StyleSheet, TouchableHighlight, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import { AuthContext } from '../../context/AuthContext';
import Colors from '../../constants/Colors';
import { Avatar } from 'react-native-elements';

import {
    Container,
    Centered,
    TopCentered,
    Left,
    TextInput,
    Button,
    Text,
    FullWidth,
    messages,
    colors,
    placeholders,
    routes,
    buttons,
    RotatedBox,
    titles
} from '../../shared';
const { height, width } = Dimensions.get('window');
interface Props {
}

const UserInfo: React.FC<Props> = () => {
    const { user, signOut } = useContext(AuthContext)


    const initials = user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()


    return (
        <TopCentered>
            <Centered>
                <Text>{titles.profile}</Text>
            </Centered>
            <Centered>
                {user.avatar ?
                    <Avatar
                        rounded
                        size="xlarge"
                        activeOpacity={0.7}
                        source={{ uri: user.avatar }}

                    /> :
                    <Avatar
                        rounded
                        size="xlarge"
                        title={initials}
                        activeOpacity={0.7}

                    />
                }</Centered>
            <FullWidth><Text>email: {user.email}</Text></FullWidth>
            <FullWidth><Text>username: {user.username}</Text></FullWidth>
            <FullWidth><Text>full name: {user.firstName} {user.lastName}</Text></FullWidth>
            <Button
                onPress={() => signOut()}
            >
                <Text color={colors.bright}>{buttons.logout}</Text>
            </Button>
        </TopCentered>
    )
}
export default UserInfo

