import React, {useState} from 'react';
import { TextInput, Platform, View, StyleSheet } from 'react-native';
import Colors from '../../res/colors';


const CoinsSearch = ({ onChange }) => {
    const [inputValue, setInputValue] = useState('');
  
    const handleChange = (query) => {
      setInputValue(query);
      onChange(query);
    };
  
    return (
      <TextInput
        style={S.textInput}
        onChangeText={handleChange}
        value={inputValue}
        placeholder="Search a Crypto Coin"
        placeholderTextColor="#000"
      />
    );
  };

  const S = StyleSheet.create({
    textInput: {
      width: '90%',
      margin: 5,
      marginLeft: 'auto',
      marginRight: 'auto',
      height: 46,
      borderRadius: 5,
      borderWidth: 1,
      paddingLeft: 16,
      color: "#000"
    },
    textInputAndroid: {
      borderBottomWidth: 2,
      borderBottomColor: Colors.zircon
    },
    textInputIOS: {
      margin: 8,
      borderRadius: 8
    }
  });

export default CoinsSearch
