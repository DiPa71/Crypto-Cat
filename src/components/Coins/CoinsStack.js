import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CoinsScreen from './CoinsScreen';
import CoinsDetails from './CoinsDetail/CoinDetaillScreen';
import Colors from '../../res/colors';


const Stack = createStackNavigator();

const CoinsStack = () => {

    return(
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
            name="Coins" 
            component={CoinsScreen}/>

            <Stack.Screen 
            name="CoinsDetails" 
            component={CoinsDetails}/>

        </Stack.Navigator>
    )

}

export default CoinsStack;