import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomerBottomTab from '../../Components/CustomerBottomTab/CustomerBottomTab';
import { useNavigation } from '@react-navigation/native';

const CartIcon = require('../../../assets/images/Customer_Icons/BottomTab/shopping_cart_Screen_icon.png');
export default function CustomerCartScreen() {
  const [CartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [totalPrice, setTotalPrice] = useState([]);
  const Navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        console.log('This is user id', user.uid);
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
          
        
        
        });
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const removeFromCart = (itemId) => {
    console.log(itemId);
    const wishlistRef = firestore()
      .collection('Customer')
      .doc(userId)
      .collection('Cart')
      .doc(itemId);
    wishlistRef.delete().then(() => {
      console.log('Item removed from Cart!');
    });
  };

  const renderCartItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
          margin: 5,
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          backgroundColor: 'white',
        }}
      >
        <View>
          <Productinfo name={item.name} price={item.price} />
          <TouchableOpacity
            onPress={() => removeFromCart(item.key)}
            style={{
              backgroundColor: '#f44336',
              padding: 10,
              borderRadius: 5,
              width: 75,
              height: 40,
              marginTop: 10,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 15 }}>Remove </Text>
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: item.image }}
          style={{ width: 100, height: 100, borderRadius: 8 }}
        />
      </View>
    );
  };

  return (
    

<View style={{flex:1}}>

<View style={{marginTop:50,alignItems:"center"}}>
  <Image style={{width:100,height:100}} source={CartIcon}/>
  <View style={{marginTop:20}}>
  <Text style={{color:"white", fontSize:30}}>Your Cart</Text>
  </View>
</View>
    <View style={{ flex: 1, marginTop: 40  , backgroundColor:"black" , padding:5,borderRadius:25}}>

      {CartItems.length > 0 ? (
        <>
          <FlatList
            data={CartItems}
            renderItem={(item) => renderCartItem(item)}
            keyExtractor={(item) => item.key}
          />
          
        </>
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No items in Your Cart
        </Text>

        
      )}


    
    </View>
    <View style={{flex:0.3 , alignItems:"center"}}>
    <Text style={{  marginRight: 20 , fontSize:20, color:"white" ,marginTop:10}}>
            Total: Rs {totalPrice}
          </Text>

          <Text style={{ marginRight: 20 ,marginRight: 20 , fontSize:20, color:"white" }}>
            Total items in cart : {CartItems.length}
          </Text>    

    </View>
    <View style={{ alignItems:"center" ,bottom:10 }}>
        
       
      </View>
    <View>
      
    </View>


    <CustomerBottomTab/>
    </View>
  );
}


function Productinfo(props) {
    return (
        <View style={{
            width: 240,
            justifyContent: "space-evenly",
        }}>
            <Text style={{
                fontSize: 25,
                fontWeight: "400",
                color:"black"
            }}>{props.name}</Text>
            
            
            <Text style={{ontSize: 20,
                fontWeight: "600",
                color:"blue"}}>
            Price: Rs<Text style={{ color:"black"}}>{props.price}</Text>
            </Text>
            

        </View>
    )
}