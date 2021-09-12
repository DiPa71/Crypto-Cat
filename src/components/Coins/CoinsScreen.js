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

    handlepress= () =>{
        this.props.navigation.navigate('CoinsDetails');
    }

    render(){

        const { coins , loading} = this.state;

        return(
            <View style={S.container}>
                { loading ? <ActivityIndicator color="#000" size="large" /> : null}
                <FlatList
                style={S.flat}
                data={coins}
                renderItem={({item}) => 
                <CoinsCart item={item} />
                } />
            </View>
        );
    }
}

const S = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.bkblack,
        color:Colors.zircon,
    },
})

export default CoinsScreen;