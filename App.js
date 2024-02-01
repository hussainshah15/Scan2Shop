/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import SignInScreen from './source/Screens/SignInScreen/SignInScreen';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
import SignUpScreen from './source/Screens/SignUpScreen/SignUpScreen';
import ForgotPasswordScreen from './source/Screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ResetPasswordScreen from './source/Screens/ResetPasswordScreen/ResetPassword';
import Auth_Navigation from './source/Navigation/AuthStack';
import App_Navigation from './source/Navigation/AppStack';
import Routes from './source/Navigation/Routes';
import { AuthProvider } from './source/Navigation/AuthProvider';
import Providers from './source/Navigation/Index';

 
 
 const App = () => {
   
   
  return(
 <Providers/>




  )
 
 };
 
 const styles = StyleSheet.create({
 
   main_container:{
     flex:1,
     backgroundColor:"#222222"
     
 
   }
  
 }

);
  
 export default App;
 