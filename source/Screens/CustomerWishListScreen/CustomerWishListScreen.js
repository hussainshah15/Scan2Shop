import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity ,Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomerBottomTab from '../../Components/CustomerBottomTab/CustomerBottomTab';



const WishListIcon = require('../../../assets/images/Customer_Icons/BottomTab/WishList_Screen_icon.png');



export default function CustomerWishListScreen() {
  const [WishlistItems, setWishListItems] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        console.log("This is user id", user.uid)
        const wishlistRef = firestore()
          .collection('Customer')
          .doc(user.uid)
          .collection('Wishlist');
        wishlistRef.onSnapshot((querySnapshot) => {
          const items = [];
          querySnapshot.forEach((documentSnapshot) => {
            items.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setWishListItems(items);
        });
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const removeFromWishlist = (itemId) => {
    console.log(itemId)
    const wishlistRef = firestore()
      .collection('Customer')
      .doc(userId)
      .collection('Wishlist')
      .doc(itemId);
    wishlistRef.delete().then(() => {
      console.log('Item removed from WishList');
    });
  };

  const renderWishlistItem = ({ item }) => {
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
            onPress={() => removeFromWishlist(item.key)}
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
    <View style={{ flex: 1}}>
<View style={{marginTop:50,alignItems:"center"}}>
  <Image style={{width:100,height:100}} source={WishListIcon}/>
  <View style={{marginTop:20}}>
  <Text style={{color:"white", fontSize:30}}>Your WishList</Text>
  </View>
</View>
    <View style={{ flex: 1 , marginTop:50}}>
      {WishlistItems.length > 0 ? (
        <FlatList
          data={WishlistItems}
          renderItem={(item) => renderWishlistItem(item)}
          keyExtractor={(item) => item.key}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No items in Your WishList
        </Text>
      )}
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