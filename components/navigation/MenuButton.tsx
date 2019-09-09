import React from 'react'
import { StyleSheet, TouchableHighlight } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
const MenuButton = ({ navigation }) => {
    console.log('props', navigation)
    return (
        // <Ionicons
        //     style={styles.menuIcon}
        //     name='md-menu'
        //     color='grey'
        //     size={32}
        //     onPress={() => navigation.toggleDrawer()}
        // />
        <TouchableHighlight
            onPress={() => navigation.toggleDrawer()}
            style={styles.menuIcon}
        >
            <Icon name="menu"
                color="grey" />

        </TouchableHighlight>
    )
}

export default MenuButton

const styles = StyleSheet.create({
    menuIcon: {
        zIndex: 0,
        backgroundColor: 'rgba(250, 250, 250, .8)',
        position: 'absolute',//use absolute position to show button on top of the map
        top: 10, //for center align
        left: 10,
        width: 40,
        height: 40,
        alignSelf: 'center',
        borderRadius: 3,
        alignContent: 'center',
        justifyContent: 'center'
    }
})