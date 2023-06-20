import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeBaseProvider, Box, Icon, Fab } from 'native-base';

// You can import from local files
import UsuarioList from './UsuarioList';

const SecondRoute = () => <Box flex={1} bg="violet.400" />;

const ThirdRoute = () => <Box flex={1} bg="red.400" />;

const Tab = createMaterialTopTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Usuário" component={UsuarioList} />
      <Tab.Screen name="Profile" component={SecondRoute} />
    </Tab.Navigator>
  );
}
