import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import { Map, Settings } from '../screens';
import { tabOptions } from '../utils/options';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Profile from '../screens/Profile';
// import MenuDrawer from '../components/navigation/MenuDrawer';

// const AppStack = createMaterialTopTabNavigator(
//   { Map, Profile, Settings },
//   tabOptions
// );

const { width, height } = Dimensions.get('window');
const DrawerConfig = {
  drawerWidth: width * 0.6,
  // contentComponent: ({ navigation }) => {
  //   return (<MenuDrawer navigation={navigation} />)
  // }
}
const AppDrawerNavigator = createDrawerNavigator({
  Map: {
    screen: Map,
  },
  Settings: {
    screen: Settings,
  },
  Profile: {
    screen: Profile,
  },
}, DrawerConfig)

export default AppDrawerNavigator;
