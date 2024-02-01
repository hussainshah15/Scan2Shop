import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet ,Text ,Image} from 'react-native';
import { AuthContext } from '../../Navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import RNRestart from 'react-native-restart';

import CustomerCartScreen from '../../Screens/CustomerCartScreen/CustomerCartScreen';

const HomeLogo = require('../../../assets/images/Customer_Icons/BottomTab/home_icon.png');
const WishListLogo = require('../../../assets/images/Customer_Icons/BottomTab/wishlist.png');
const DetectLogo = require('../../../assets/images/Customer_Icons/BottomTab/Detecticon.png');
const LogoutLogo = require('../../../assets/images/Customer_Icons/BottomTab/log_out.png');
const paymentLogo = require('../../../assets/images/Customer_Icons/BottomTab/payment_icon.png');






function CustomerBottomTab({ activeTab, setActiveTab }) {

  const { user, logout } = useContext(AuthContext);

  const onDetectPressed = () => {
    Navigation.navigate("DetectScreen");
  }
  const onWishListPressed = () => {
    Navigation.navigate("CustomerWishListScreen");
  }
  const onHomePressed = () => {
    Navigation.navigate("HomeScreen");
  }
  const OnLogoutPressed = () => {

   
    logout();
    RNRestart.restart();
  };
  const OnPaymentPressed = () => {
    Navigation.navigate("PaymentsScreen");;
  };
  const Navigation = useNavigation();
 
  return (
    <View style={styles.tabContainer}>
  
      <View style={styles.tabButton}>
    <TouchableOpacity onPress={onHomePressed
    }>
        <View >

        <View style={{backgroundColor:"white" , padding:10 , borderRadius:100,alignItems:"center",height:50,width:50}}>
<Image  style ={{height:30,width:30 }}source={HomeLogo}/>
</View></View>
<Text style={{fontSize:15, marginLeft:5 , fontWeight:"bold" , color:"black"}}>Home</Text>
</TouchableOpacity>


      </View>
      
      
      <View style={styles.tabButton}>
    <TouchableOpacity onPress={onWishListPressed}>
        <View >

        <View style={{backgroundColor:"white" , padding:10 , borderRadius:100 ,alignItems:"center",height:50,width:50}}>
<Image  style ={{height:30,width:30 }}source={WishListLogo}/>
</View></View>
<Text style={{fontSize:15, marginLeft:5 , fontWeight:"bold" , color:"black"}}>WishList</Text>
</TouchableOpacity>


      </View>
      <View style={styles.tabButton}>
    <TouchableOpacity onPress={onDetectPressed}>
        <View >

        <View style={{backgroundColor:"white" , padding:10 , borderRadius:100, alignItems:"center" , height:50,width:50}}>
<Image  style ={{height:30,width:30 }}source={DetectLogo}/>
</View></View>
<Text style={{fontSize:15, marginLeft:10 , fontWeight:"bold",color:"black"}}>Detect</Text>
</TouchableOpacity>


      </View>
      <View style={styles.tabButton}>
    <TouchableOpacity onPress={OnPaymentPressed}>
        <View >

        <View style={{backgroundColor:"white" , padding:10 , borderRadius:100, alignItems:"center",height:50,width:50}}>
<Image  style ={{height:30,width:30 }}source={paymentLogo}/>
</View></View>
<Text style={{fontSize:15, marginLeft:10 , fontWeight:"bold" , color:"black"}}>Pay</Text>
</TouchableOpacity>


      </View>
      <View style={styles.tabButton}>
    <TouchableOpacity onPress={OnLogoutPressed}>
        <View >

        <View style={{backgroundColor:"white" , padding:10 , borderRadius:100, alignItems:"center",height:50,width:50}}>
<Image  style ={{height:20,width:30 }}source={LogoutLogo}/>
</View></View>
<Text style={{fontSize:15, marginLeft:5 , fontWeight:"bold" , color:"black"}}>Logout</Text>
</TouchableOpacity>

      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 5,
    paddingTop:10,
    
  
    backgroundColor:"#363636",
    borderRadius:20
  },
  tabButton: {
  
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#007aff',
  },
});

function HomeIcon() {
  return (
    <View style={styles.iconContainer}>
   <Image source={HomeLogo}/> </View>
  );
}

function CartIcon() {
  return (
    <View style={styles.iconContainer}>
   <Image source={HomeLogo}/> </View>
  );
}

function WishlistIcon() {
  return (
    <View style={styles.iconContainer}>
 <Image source={HomeLogo}/>   </View>
  );
}

function ProfileIcon() {
  return (
    <View style={styles.iconContainer}>
      <Image source={HomeLogo}/>
    </View>
  );
}

export default CustomerBottomTab;
