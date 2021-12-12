import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../src/screens/HomeScreen';
import QuestionScreen from '../src/screens/QuestionScreen';

export type UsuarioStackParams = {
  Home: undefined;
  QuestionScreen: {usuario: string | undefined};
};
const Stack = createStackNavigator<UsuarioStackParams>();

export const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
    </Stack.Navigator>
  );
};
