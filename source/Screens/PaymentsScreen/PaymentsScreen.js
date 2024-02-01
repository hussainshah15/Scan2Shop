import { View, Text , SafeAreaView, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentComponent from '../../Components/PaymentComponent/PaymentComponent';
import CustomerBottomTab from '../../Components/CustomerBottomTab/CustomerBottomTab';
const CardIcon = require('../../../assets/images/Customer_Icons/BottomTab/debit_card.png');






export default function PaymentsScreen() {

  const [CartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
 
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
  
    
        const wishlistRef = firestore()
          .collection('Customer')
          .doc(user.uid)
          .collection('Cart');
        wishlistRef.onSnapshot((querySnapshot) => {
          const items = [];
          let total = 0;
          
          querySnapshot.forEach((documentSnapshot) => {
            const item = {
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            };
            let value=parseInt(item.price)
           total += value;
            items.push(item);
          });
          setCartItems(items);
          setTotalPrice(total);
          console.log(totalPrice)
          
        
        
        });
      } else {

        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);



 
  
    return (

        <View style={{flex:1}}>
    <SafeAreaView style={{flex:1}}>    
      <View style={{marginTop:150,alignItems:"center"}}>
       <Image style={{width:100,height:100}} source={CardIcon}/>
       <View style={{marginTop:50,alignItems:"center" ,backgroundColor:"black",padding:10, borderRadius:10}}>

        <Text style={{fontSize:20, color:"white"}}> Enter Your Card Details here</Text>
       </View>
       <View style={{marginTop:50,alignItems:"center" ,backgroundColor:"white",padding:10, borderRadius:10}}>

        <Text style={{fontSize:20, color:"black"}}> Total Payable Amount: {totalPrice}</Text>
       </View>
      </View>
    
      <StripeProvider
      publishableKey={'pk_test_51MlYkNCOdchHMTkE0UjykZ1mF1wnuQHu7hNYUDvbONZhL37DQCsYgB46nPnKszeQ0YuArgftjoWhouVeBs33EoHg00jRjuYfSD'}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <PaymentComponent />
    </StripeProvider>
 

    </SafeAreaView>
    <CustomerBottomTab/>
    </View>
  )
}