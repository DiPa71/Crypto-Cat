
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from './FavoritesScreen';
import Colors from '../../res/colors';

const Stack = createStackNavigator();

const FavoritesStack = () => {

  return (
    <Stack.Navigator
       screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: Colors.bkblack,
        },
        headerTintColor: Colors.white,
        shodowColors: Colors.charade,       
    }}
    >
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
      />
    </Stack.Navigator>
  );
}

export default FavoritesStack;