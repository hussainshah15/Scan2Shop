import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer,  DefaultTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BrandMainScreen from '../Screens/BrandMainScreen/BrandMainScreen';
import AddProductScreen from '../Screens/AddProductScreen';
import ItemDetailsScreen from '../Screens/ItemDetailsScreen';
import BrandInventoryScreen from '../Screens/BrandInventoryScreen/BrandInventoryScreen';
import BrandProductsScreen from '../Screens/BrandProductsScreen/BrandProductsScreen';
import UploadModelScreen from '../Screens/UploadModelScreen/UploadModelScreen';
import ProductModelScreen from '../Screens/ProductModelScreen/ProductModelScreen';
import ARScreen from '../Screens/ARScreen/ARScreen';


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#222222'
  },
};

export default function Brands_Navigation() {
  const AppStack = createNativeStackNavigator();
  return (    
      <AppStack.Navigator screenOptions={{headerShown: false}} >
     
        <AppStack.Screen name="BrandMainScreen" component={BrandMainScreen}/>
        <AppStack.Screen name="AddProductScreen" component={AddProductScreen}/>
        <AppStack.Screen name="itemDetailsScreen" component={ItemDetailsScreen}/>
        <AppStack.Screen name="BrandInventoryScreen" component={BrandInventoryScreen}/>
        <AppStack.Screen name="BrandProductsScreen" component={BrandProductsScreen}/>
        <AppStack.Screen name="ProductModelScreen" component={ProductModelScreen}/>
        <AppStack.Screen name="UploadModelScreen" component={UploadModelScreen}/>

       
      </AppStack.Navigator>


  )
}