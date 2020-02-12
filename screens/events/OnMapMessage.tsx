import React, { FC } from 'react';
import { MapMessage, TextSmall, ContainerRow } from '../../shared';
import { Avatar } from 'react-native-elements';

interface Props {
    message: string
}
export const OnMapMessage: FC<Props> = ({ message }) => {
    console.log('message :', message);
    return (
        <MapMessage>
            <ContainerRow>

                <Avatar
                    rounded
                    size="small"
                    activeOpacity={0.7}
                    source={require('../../assets/images/Galileo_logo_animation_3.gif')}

                />
                <TextSmall>{message}</TextSmall>
            </ContainerRow>

        </MapMessage>

    );
}

