import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Settings, Profile, Map } from '../screens';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Map">
                <Drawer.Screen name="Map" component={Map} />
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="Settings" component={Settings} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}


