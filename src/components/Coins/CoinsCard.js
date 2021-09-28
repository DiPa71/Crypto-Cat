import colors from 'ansicolors';
import React from 'react';
import {View, StyleSheet, Pressable, Text, Image } from 'react-native';

import Colors from '../../res/colors';

const CoinsCart = ({item, onPress}) => {

   const getImagea = () =>{
        if(item.percent_change_1h > 0){
            return require("../../assets/img/arrowup.png");
        } else {
            return require("../../assets/img/arrowdown.png");
        }
    

    } 



    return (
    <Pressable onPress={onPress} style={S.container}>
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
    </Pressable>
    )
}

const S = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        borderBottomColor: Colors.charade,
        borderBottomWidth: 1,
        paddingLeft: Platform.OS == 'ios' ? 16 : 6,
    },
    row: {
        flexDirection: "row",
    },
    name: {
        color: Colors.bkblack,
        fontSize: 14
    },
    symbol: {
        color: Colors.bkblack,
        fontWeight: "bold",
        fontSize: 16,
        marginRight: 12
    },
    perc:{
        fontSize: 12,
        color: Colors.bkblack,
    },
    price:{
        color: Colors.bkblack,

    },
    img: {
        width: 20,
        height:20,
    }
})

export default CoinsCart;