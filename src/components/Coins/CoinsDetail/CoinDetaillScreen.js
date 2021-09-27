import React, {Component} from 'react';
import {View, Text, Image, SectionList, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import Http from '../../../libs/http';
import Colors from '../../../res/colors';
import Market from '../CoinsDetail/Marketplace';
import marketImg from '../../../assets/img/market.png';

class CoinDetails extends Component {

    state = {
        coin: {},
        markets: [],
        loading: false,
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

        this.setState({ coin });
    }

    render() {

        const { coin, markets } = this.state;

        return (
            <View style={S.container}>
                <View style={S.subHeader}>
                    <Image style={S.iconImg} source={{uri: this.getSymbolIcon(coin.name) }} />
                    <Text style={S.title}>{coin.name}</Text>
                </View>
                <SectionList style={S.SectionListcont}
                    sections={this.getSections(coin)}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => <Text style={S.itemInfo}>{item}</Text>}
                    renderSectionHeader={({ section }) => <Text style={S.itemTitle}>{section.title}</Text>}
                />
                <View style={S.sectionTwo}>
                    <View style={S.subHeader}>
                        <Image style={S.iconImg} source={marketImg}/>
                        <Text style={S.title}>
                            Markets
                        </Text>
                    </View>
                    <View style={S.containerf}>
                    {this.state.loading ? <ActivityIndicator style={S.loading} color="#4078c0" size="large" /> :
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
        flex: 1,
    },
    flatlist: {
        maxHeight: 100,
    },
    containerf:{
        width: '100%',
        height: '100%',
        paddingTop: 20,
        backgroundColor: Colors.bkblack
    },
    sectionTwo:{
        height: '50%'
    },
    SectionListcont:{
        width: '100%',
        height: '50%',
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
        borderTopWidth: 1,
        borderTopColor: Colors.charade,
        borderBottomWidth: 1,
        borderBottomColor: Colors.charade,
    },
    itemTitle:{
        padding: 10,
        fontWeight: 'bold',
        fontSize: 15,
        color: Colors.charade,
        backgroundColor: Colors.Brown,
        borderTopWidth: 1,
        borderTopColor: Colors.charade,
        borderBottomWidth: 1,
        borderBottomColor: Colors.charade,

    },
    subHeader: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding:16,
        flexDirection: "row",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        marginLeft: 8
    },
    iconImg: {
        width: 25,
        height: 25
    }
})

export default CoinDetails;