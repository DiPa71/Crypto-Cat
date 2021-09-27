import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../../res/colors';


const Marketplace = ({item}) => {
    return (
        <View style={S.cardContainer}>
            <Text style={S.cardStore}>{item.name}</Text>
            <Text style={S.cardPrice}>{item.price_usd}</Text>
        </View>
    )
}

const S = StyleSheet.create({
    cardContainer: {
        width: 140,
        height: 80,
        maxWidth: 150,
        maxHeight: 150,
        padding: 14,
        backgroundColor: Colors.Blue,
        margin: 10,
        borderRadius: 5,
        borderWidth:1,
        borderColor: Colors.bkblack
    },
    cardStore: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.white,    
    },
    cardPrice:{
        textAlign: 'center',
        color: Colors.zircon,
        fontSize: 16,
        fontWeight: 'bold',   
    }
})
export default Marketplace;
