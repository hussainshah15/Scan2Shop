import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import SignUpScreen from '../SignUpScreen/SignUpScreen';
import SignInScreen from '../SignInScreen/SignInScreen';
const Scan2ShopLogo = require('../../../assets/images/Logo.png');

const MainScreen = () => {
  const Navigation=useNavigation();



  const LogInPressed=()=>{
    Navigation.navigate(SignInScreen)
}

const SignUpPressed=()=>{

  Navigation.navigate('StartScreen')
}


  return (
    <View style={styles.container}>
      <Image source={Scan2ShopLogo} style={styles.logo} />
      <Text style={styles.title}>Scan 2 Shop</Text>
      <TouchableOpacity style={styles.button} onPress={LogInPressed}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={SignUpPressed}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MainScreen;
