import React, { Component } from 'react';
import {View, FlatList , ActivityIndicator, StyleSheet, Text, Alert } from 'react-native';
import Http from '../../libs/http';
import CoinsCart from './CoinsCart';
import Colors from '../../res/colors';


class CoinsScreen extends Component {

    state = {
        coins: [],
        loading: false
    }
   

    componentDidMount = async () =>{
        this.setState({loading: true });

        const res = await Http.instance.get("https://api.coinlore.net/api/tickers/");
        
        this.setState({coins: res.data, loading: false });
    }

    handlepress= (coin) =>{
        this.props.navigation.navigate('CoinsDetails', { coin });
    }


    render(){

        const { coins , loading} = this.state;

        return(
            <View style={S.container}>
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