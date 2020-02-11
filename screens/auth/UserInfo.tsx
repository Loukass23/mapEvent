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
    Image,
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

const UserInfo: React.FC<Props> = () => {
    const { user, signOut } = useContext(AuthContext)




    return (

        <TopCentered>
            {user.avatar &&
                <Avatar
                    source={{ uri: user.avatar }}
                // showEditButton={true}
                />
            }
            <Text > {user.email}</Text>
            <Text > {user.username}</Text>
            <Text > {user.firstName} {user.lastName}</Text>


            <Button
                onPress={() => signOut()}
            >
                <Text color={colors.bright}>{buttons.logout}</Text>
            </Button>

        </TopCentered>
    )
}
export default UserInfo

