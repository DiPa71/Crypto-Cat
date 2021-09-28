import React, { Component } from 'react';
import {View, FlatList , ActivityIndicator, StyleSheet, Text, Alert } from 'react-native';
import Http from '../../libs/http';
import CoinsCart from './CoinsCard';
import Colors from '../../res/colors';
import Search from './CoinsSearch';


class CoinsScreen extends Component {

    state = {
        coins: [],
        allCoins: [],
        loading: false
    }
   

    componentDidMount = () =>{
        this.getData();
    }

    getData = async () => {
        this.setState({...this.state, loading: true });

        const res = await Http.instance.get("https://api.coinlore.net/api/tickers/");

        this.setState({coins: res.data, allCoins: res.data, loading: false });
    }

    handlepress= (coin) =>{
        this.props.navigation.navigate('CoinsDetails', { coin });
    }

    handlesearch = (query) => {
        const data = this.state.allCoins;
        const coinsFiltered = data.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({coins: coinsFiltered})

    }


    render(){

        const { coins , loading } = this.state;

        return(
            <View style={S.container}>
                <Search onChange={this.handlesearch}/>
                { loading ? <ActivityIndicator style={S.loading} color="#000" size="large" /> : null}
                <FlatList
                style={S.flat}
                data={coins}
                renderItem={({item}) => 
                <CoinsCart item={item} onPress={() => this.handlepress(item)}/>
                } />
            </View>
        );
    }
}

const S = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.white,
        color:Colors.bkblack,
    },
    loading: {
        marginTop: 50,
    }
})

export default CoinsScreen;