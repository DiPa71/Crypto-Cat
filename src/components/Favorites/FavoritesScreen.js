import React, {Component} from "react";
import {View, StyleSheet, Text, FlatList } from 'react-native';
// import Favorites from './FavoritesEmpty';
import Colors from '../../res/colors';
import CoinsCard from '../Coins/CoinsCard';
import Storage from "../../libs/storage";

class FavoritesScreen extends Component {
    state= {
        favorites: []
    }

    getFavorites = async () => {
        try{

            const allkeys = await Storage.instance.getAllkeys();

            const keys = allkeys.filter((key) => key.includes('favorite-'));

            const favs = await Storage.instance.multiGet(keys);

            const favorites = favs.map((fav) => JSON.parse(fav[1]));

            this.setState({favorites})

        }catch(err){
            console.log('get favorites error: ', err)
        }
    }   

    componentDidMount = () => {
        this.getFavorites()

        this.props.navigation.addListener("focus", this.getFavorites);
    }

    componentWillUnmount = () =>{
        this.props.navigation.removeListener("focus", this.getFavorites);
    }

    handlePress = (coin) =>{
        this.props.navigation.navigate('CoinsDetails', { coin })
    }

    render() {
        const {favorites} = this.state;

        return (
            <View style={styles.container}>
      
             { favorites.length == 0 ?
              <Text>Add items to your favorite</Text>
              : null
             }
      
             { favorites.length > 0 ?
              <FlatList
                data={favorites}
                renderItem={({ item }) =>
                  <CoinsCard
                    item={item}
                    onPress={() => this.handlePress(item)}
                  />
                }
              />
              : null
             }
      
            </View>
          );
        }
      }
      
      const styles = StyleSheet.create({
        container: {
          backgroundColor: Colors.white,
          flex: 1
        }
      });

export default FavoritesScreen;