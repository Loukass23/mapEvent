import React, { useState, useContext } from 'react'
import { View, StyleSheet, TouchableHighlight, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons';
import { ImageInfo } from '../@types';
import MenuButton from '../components/navigation/MenuButton';
import { ListItem } from 'react-native-elements';
import { AuthContext } from '../context/AuthContext';
// import { SignUp, SignIn } from '.';

import {
    Container,
    Centered,
    Left,
    TopCentered,
    TextInput,
    Button,
    Text,
    messages,
    colors,
    placeholders,
    routes,
    buttons,
    RotatedBox
} from '../shared';
import { SignIn, SignUp, UserInfo } from '.';

interface Props {
    navigation: any
}

const Profile: React.FC<Props> = ({ navigation }) => {
    const { user } = useContext(AuthContext)
    const [register, setRegister] = useState<boolean>(false)


    return (
        <Container>
            <Centered>
                <Left>
                    <MenuButton navigation={navigation} />
                </Left>
            </Centered>

            {user ?
                <Container>
                    <UserInfo />
                </Container>
                :
                <React.Fragment>
                    {!register ?
                        <Container>
                            <SignIn />
                            <Text onPress={() => setRegister(true)}>{messages.register}</Text>

                        </Container> :
                        <Container>


                            <SignUp />
                            <Text onPress={() => setRegister(false)}>{messages.already}</Text>

                        </Container>
                    }
                </React.Fragment>
            }

        </Container>
    )

}
export default Profile

