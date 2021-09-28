import { NavigationContainer } from '@react-navigation/native';
import React, {useEffect}from 'react';
import { Image } from 'react-native';
import CoinsStack from './src/components/Coins/CoinsStack';
import FavoritesStack from './src/components/Favorites/FavoriteStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CryptoIcon from './src/assets/img/binance.png';
import Favorite from './src/assets/img/favorite.png';


const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={{
          headerShown: false,
          "tabBarActiveTintColor": "#fff",
          "tabBarItemStyle":[
            {
              borderRadius: 10
            }
          ],
          "tabBarStyle":[
            {
              backgroundColor: '#000'
            }
          ]
        }}
      >
        <Tabs.Screen
        name='coins'
        component={CoinsStack}
        options={{
          tabBarIcon: ({size}) => (
            <Image 
            style={{width: size,  height: size}}
            source={CryptoIcon}/>
          )
        }}
        />
        <Tabs.Screen
          name="favorites"
          component={FavoritesStack}
          options={{
            tabBarIcon: ({ size }) => (
              <Image
                style={{ width: size, height: size }}
                source={Favorite}
              />
            )
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
  
};


export default App;
