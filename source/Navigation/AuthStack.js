import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer,  DefaultTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../Screens/SignUpScreen/SignUpScreen';
import SignInScreen from '../Screens/SignInScreen/SignInScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ResetPasswordScreen from '../Screens/ResetPasswordScreen/ResetPassword';

import MainScreen from '../Screens/MainScreen/MainScreen';
import RegisterBrandScreen from '../Screens/RegisterBrandsScreen/RegisterBrandScreen';
import BrandSignInScreen from '../Screens/BrandSignInScreen';
import StartScreen from '../Screens/StartScreen';





export default function Auth_Navigation() {
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator screenOptions={{headerShown: false}} >
      
        <Stack.Screen name="MainScreen" component={MainScreen}/> 
        <Stack.Screen name="StartScreen" component={StartScreen}/> 
        
        <Stack.Screen name="SignInScreen" component={SignInScreen}/> 
        <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <Stack.Screen name="RegisterBrandsScreen" component={RegisterBrandScreen}/>
        <Stack.Screen name="BrandSignInScreen" component={BrandSignInScreen}/> 
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/> 
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/> 
      </Stack.Navigator>

  )
}