import React, { useState, useContext } from 'react'
import MenuButton from '../components/navigation/MenuButton';
import { AuthContext } from '../context/AuthContext';

import {
    Container,
    Centered,
    Left,
    Text,
    messages,
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

            {user?.token ?
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

