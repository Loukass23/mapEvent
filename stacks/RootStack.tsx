import { createSwitchNavigator } from 'react-navigation';

import { Loading, Map } from '../screens';
// import AuthStack from './AuthStack';
import AppStack from './AppStack';
import AppDrawer from './AppDrawer';

const RootStack = createSwitchNavigator(
  {
    Loading,
    App: AppStack,
    // Auth: AuthStack,
  },
  {
    initialRouteName: 'App',
  }
);

export default RootStack;
