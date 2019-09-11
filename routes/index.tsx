import React from 'react'
import { createAppContainer } from "react-navigation";
import { SettingsScreen } from "../screens/SettingsScreen";
import MapScreen from "../screens/MapScreen";

import { Dimensions } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import MenuDrawer from '../components/navigation/MenuDrawer'
import EventScreen from '../screens/EventScreen';

export enum ROUTES {
    RootMain = "RootMain",
    RootModal = "RootModal",
    RootDetails = "RootDetails",
    ModalMain = "ModalMain",
    MainHome = "MainHome",
    MainDetails = "MainDetails"
}
const { width, height } = Dimensions.get('window');

const DrawerConfig = {
    drawerWidth: width * 0.83,
    // contentComponent: ({ navigation }) => {
    //     return (<MenuDrawer navigation={navigation} />)
    // }
}


const AppDrawerNavigator = createDrawerNavigator({
    Map: {
        screen: MapScreen,
    },
    Settings: {
        screen: SettingsScreen,
    },
    Event: {
        screen: EventScreen
    }

}, DrawerConfig)

// // The stack for the main navigation
// const MainStack = createStackNavigator({
//     [ROUTES.MainHome]: {
//         screen: HomeScreen
//     },
//     [ROUTES.MainDetails]: {
//         screen: DetailScreen
//     }
// });

// // The app root stack, all navigation start from here
// const RootStack = createStackNavigator(
//     {
//         [ROUTES.RootMain]: {
//             screen: MainStack
//         },
//         [ROUTES.RootModal]: {
//             screen: ModalStack
//         }
//     },
//     {
//         mode: "modal",
//         headerMode: "none"
//     }
// );

const AppContainer = createAppContainer(AppDrawerNavigator);

export default AppContainer;