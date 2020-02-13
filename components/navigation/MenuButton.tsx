import React, { useContext, FC } from 'react'
import { Icon } from 'react-native-elements';
import { ActionButton } from '../../shared';
import { EventContext } from '../../context/EventContext';

interface Props {
    navigation: any,
    icon: string,
    left: string
}

const MenuButton: FC<Props> = ({ navigation, icon, left }) => {
    const { handleSetMarker } = useContext(EventContext)
    const action = () => icon === 'menu' ? navigation.toggleDrawer() : handleSetMarker(null)

    return (

        <ActionButton
            left={left}
            onPress={() => action()}
        >
            <Icon name={icon}
                color="grey" />

        </ActionButton>
    )
}

export default MenuButton