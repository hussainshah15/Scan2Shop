import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer,  DefaultTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BrandsDetailsScreen from '../Screens/BrandsDetailsScreen/BrandsDetailsScreen';
import ItemDetailsScreen from '../Screens/ItemDetailsScreen';
import CustomerWishListScreen from '../Screens/CustomerWishListScreen/CustomerWishListScreen';
import CustomerCartScreen from '../Screens/CustomerCartScreen/CustomerCartScreen';
import PaymentsScreen from '../Screens/PaymentsScreen/PaymentsScreen';
import CustomerBottomTab from '../Components/CustomerBottomTab/CustomerBottomTab';
import ARScreen from '../Screens/ARScreen/ARScreen';
import DetectScreen from '../Screens/DetectScreen/DetectScreen';
import ImageComparisonScreen from '../Screens/ImageComparisonScreen/ImageComparisonScreen';
import DetectedProductDetailsScreen from '../Screens/DetectedProductDetailsScreen/DetectedProductDetailsScreen';
import MensWearScreen from '../Screens/MensWearScreen/MensWearScreen';
import WomanWearScreen from '../Screens/WomanWearScreen/WomanWearScreen';
import ChildrenWearScreen from '../Screens/ChildrenWearScreen/ChildrenWearScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import CustomerSupportScreen from '../Screens/CustomerSupportScreen/CustomerSupportScreen';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#222222'
  },
};

export default function App_Navigation() {
  const AppStack = createNativeStackNavigator();
  return (    
      <AppStack.Navigator screenOptions={{headerShown: false}} >
   
  
        
        <AppStack.Screen name="HomeScreen" component={HomeScreen}/>
        <AppStack.Screen name="BrandsDetailsScreen" component={BrandsDetailsScreen}/>
        <AppStack.Screen name="ItemDetailsScreen" component={ItemDetailsScreen}/>
        <AppStack.Screen name="CustomerWishListScreen" component={CustomerWishListScreen}/>
        <AppStack.Screen name="CustomerCartScreen" component={CustomerCartScreen}/>
        <AppStack.Screen name="PaymentsScreen" component={PaymentsScreen}/>
        <AppStack.Screen name="ARScreen" component={ARScreen}/>
        <AppStack.Screen name="DetectScreen" component={DetectScreen}/>
        <AppStack.Screen name="ImageComparisonScreen" component={ImageComparisonScreen}/>
        <AppStack.Screen name="DetectedProductDetailsScreen" component={DetectedProductDetailsScreen}/>
        <AppStack.Screen name="MensWearScreen" component={MensWearScreen}/>
        <AppStack.Screen name="WomanWearScreen" component={WomanWearScreen}/>
        <AppStack.Screen name="ChildrenWearScreen" component={ChildrenWearScreen}/>
        <AppStack.Screen name="ProfileScreen" component={ProfileScreen}/>
        <AppStack.Screen name="CustomerSupportScreen" component={CustomerSupportScreen}/>
      </AppStack.Navigator>


  )
}