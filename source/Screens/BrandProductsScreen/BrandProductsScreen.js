import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity , Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BrandProductScreen() {
  const [BrandItems, setBrandItems] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        console.log("This is user id", user.uid)
        const BrandRef = firestore()
          .collection('Brand')
          .doc(user.uid)
          .collection('products');
        BrandRef.onSnapshot((querySnapshot) => {
          const items = [];
          querySnapshot.forEach((documentSnapshot) => {
            items.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setBrandItems(items);
        });
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);



  const renderBrandItem = ({ item }) => {
    return (


        <View style={{flex:1}}>



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
         
            style={{
              backgroundColor: 'blue',
              padding: 10,
              borderRadius: 5,
              width: 200,
              height: 40,
              marginTop: 10,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 15 }}>Remaining Products: {item.noOfProducts}</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: item.images[0] }}
          style={{ width: 100, height: 100, borderRadius: 8 }}
        />
      </View>
      </View>
    );
  };
  
  return (
    <View style={{ flex: 1 , marginTop:100}}>

<View style={{alignItems:"center", marginBottom:12}}>
  <Text style={{color:"white", fontSize:25}}>Your Products </Text>
</View>
      {BrandItems.length > 0 ? (
        <FlatList
          data={BrandItems}
          renderItem={(item) => renderBrandItem(item)}
          keyExtractor={(item) => item.key}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 , fontSize:20,color:"red" }}>
          No items in Your Brand
        </Text>
      )}
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