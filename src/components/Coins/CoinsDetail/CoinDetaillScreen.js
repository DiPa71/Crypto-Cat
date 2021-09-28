import React, {Component} from 'react';
import {View, Text, Image, SectionList, FlatList, StyleSheet, ActivityIndicator, Pressable, Alert} from 'react-native';
import Http from '../../../libs/http';
import Colors from '../../../res/colors';
import Market from '../CoinsDetail/Marketplace';
import marketImg from '../../../assets/img/market.png';
import NotFav from '../../../assets/img/estrella.png';
import Fav from '../../../assets/img/favorito.png';
import Storage from '../../../libs/storage';

class CoinDetails extends Component {

    state = {
        coin: {},
        markets: [],
        loading: false,
        isFavorite: false,
    }
    
    toogleFavorite = () => {

        if(this.state.isFavorite) {
          this.removeFavorite();
        } else {
          this.addFavorite();
        }
      }
    
      addFavorite = async() => {
        const coin = JSON.stringify(this.state.coin);
        const key = `favorite-${this.state.coin.id}`;
    
        const stored = await Storage.instance.store(key, coin);
    
        if(stored) {
          this.setState({ isFavorite: true });
        }
    
      }
    
      removeFavorite = async () => {
    
        Alert.alert("Remove favorite", "Are you sure?", [
          {
            text: "cancel",
            onPress: () => {},
            style: "cancel"
          },
          {
            text: "Remove",
            onPress: async () => {
    
              const key = 'favorite-' + this.state.coin.id;
    
              const stored = await Storage.instance.remove(key);

            this.setState({ isFavorite: false });
            },
            style: "destructive"
          }
        ]);
    
      }
    
      getFavorite = async () => {
        try {
          const key = 'favorite-' + this.state.coin.id;
    
          const favStr = await Storage.instance.get(key);
    
          if(favStr != null) {
            this.setState({ isFavorite: true });
          }
    
        } catch(err) {
          console.log("get favorites err", err);
        }
    
      }

    getSymbolIcon = (name) =>{
        if(name){
            const symbol = name.toLowerCase().replace(" ", "-");
            return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
        }
        
    }

    getMarkets = async (coinId) =>{
        this.setState({loading: true});
        
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

        const markets = await Http.instance.get(url);

        this.setState({loading: false, markets });

    }

    getSections = (coin) =>{
        const sect = [
        {
            title: "Market cap",
            data: [coin.market_cap_usd]
        },
        {
            title: "Volume 24h",
            data: [coin.volume24]
        },
        {
            title: "Change every 24H",
            data: [coin.percent_change_24h]
        }
    
        ]

        return sect;

    }

    componentDidMount() {
        const { coin } = this.props.route.params;
        this.props.navigation.setOptions({ title: `${coin.name} [${coin.symbol}]` })


        this.getMarkets(coin.id);

        this.setState({ coin }, () => {
            this.toogleFavorite();
        });
    }

    render() {

        const { coin, markets, isFavorite } = this.state;

        return (
            <View style={S.container}>
                <View style={S.sectionOne}>
                    <View style={S.subHeader}>
                        <View style={S.row}>
                            <Image style={S.iconImg} source={{uri: this.getSymbolIcon(coin.name) }} />
                            <Text style={S.title}>{coin.name}</Text>
                        </View>
                        <Pressable 
                        onPress={this.toogleFavorite}
                        style={[
                            S.buttonFav,
                            isFavorite ?
                            S.buttonFavRemove :
                            S.buttonFavAdd
                        ]}>
                            <Text style={S.FavText}>{ isFavorite == true ? "Remove Favorites" : "Add Favorites" }</Text>
                        </Pressable>
                    </View>
                    <SectionList style={S.SectionListcont}
                        sections={this.getSections(coin)}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => <Text style={S.itemInfo}>{item}</Text>}
                        renderSectionHeader={({ section }) => <Text style={S.itemTitle}>{section.title}</Text>}
                    />
                </View>
                <View style={S.sectionTwo}>
                    <View style={S.subHeadert}>
                        <Image style={S.iconImg} source={marketImg}/>
                        <Text style={S.title}>
                            Markets
                        </Text>
                    </View>
                    <View style={S.containerf}>
                    {this.state.loading ? <ActivityIndicator style={S.loading} color="#fff" size="large" /> :
                        <FlatList style={S.flatlist}
                            horizontal={true}
                            data={markets}
                            renderItem={({ item }) => <Market item={item}/>}
                        />}
                    </View>
                </View>
            </View>
        )
    }
}

const S = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: Colors.white,
    },
    flatlist: {
        maxHeight: 100,
    },
    containerf:{
        width: '100%',
        height: '80%',
        paddingTop: 20,
        backgroundColor: Colors.bkblack
    },
    sectionOne:{
        height: '70%',
    },
    sectionTwo:{
        height: '30%',
        flex: 1,
        flexDirection: 'column'
    },
    SectionListcont:{
        width: '100%',
        height: '70%',
        borderTopWidth: 1,
        borderTopColor: Colors.charade,
        borderBottomWidth: 1,
        borderBottomColor: Colors.charade,
        height: 2,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    itemInfo:{
        padding: 13,
        color: Colors.bkblack,
        backgroundColor: Colors.LigthBrown,
    },
    itemTitle:{
        padding: 10,
        fontWeight: 'bold',
        fontSize: 15,
        color: Colors.charade,
        borderBottomColor: Colors.charade,

    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    subHeader: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    subHeadert: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        marginLeft: 8
    },
    iconImg: {
        width: 30,
        height: 30,
    },
    buttonFav: {
        padding: 0,
        borderRadius: 5,
    },
    buttonFavAdd:{
        backgroundColor: Colors.bkblack
    },
    FavText: {
        color: Colors.white,
        padding: 10,
        fontSize: 10
    },
    buttonFavRemove: {
        backgroundColor: Colors.carmine
    },
})

export default CoinDetails;