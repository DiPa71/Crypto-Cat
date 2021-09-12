import React from 'react';
import {View, StyleSheet, Text, Image } from 'react-native';

import Colors from '../../res/colors';

const CoinsCart = ({item}) => {

   const getImagea = () =>{
        if(item.percent_change_1h > 0){
            return require("../../assets/img/arrowup.png");
        } else {
            return require("../../assets/img/arrowdown.png");
        }
    

    } 

    return (
    <View style={S.container}>
        <View>
            <View style={S.row}>
                <Text style={S.symbol}> {item.symbol}</Text>
                <Text style={S.name}> {item.name}</Text>
            </View>
            <View>
                <Text style={S.perc}>{`$${item.percent_change_1h}`}</Text>
            </View>
        </View>

        <View style={S.row}>
                <Text style={S.price}> {item.price_usd}</Text>
                <Image 
                    style={S.img}
                    source={getImagea()}
                />
        </View>
    </View>
    )
}

const S = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
    },
    row: {
        flexDirection: "row",
    },
    name: {
        color: Colors.zircon,
        fontSize: 14
    },
    symbol: {
        color: Colors.White2,
        fontWeight: "bold",
        fontSize: 16,
        marginRight: 12
    },
    perc:{
        fontSize: 12,
        color: Colors.white,
    },
    price:{
        color: Colors.white,

    },
    img: {
        width: 20,
        height:20,
    }
})

export default CoinsCart;