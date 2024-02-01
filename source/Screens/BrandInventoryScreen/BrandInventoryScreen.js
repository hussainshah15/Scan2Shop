import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BrandInventoryScreen() {
  const [BrandItems, setBrandItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [no_products, set_productno] = useState([]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      
        const BrandRef = firestore()
          .collection('Brand')
          .doc(user.uid)
          .collection('products');
        BrandRef.onSnapshot((querySnapshot) => {
          const items = [];
          let total = 0;
          querySnapshot.forEach((documentSnapshot) => {
            const item = {
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            };
            let value=parseInt(item.noOfProducts)
            total += item.noOfProducts;
            items.push(item);
          });
          setBrandItems(items);
          set_productno(total);
        });
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const renderBrandItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
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
              <Text style={{ color: '#fff', fontSize: 15 }}>
                Remaining Products: {item.noOfProducts}
              </Text>
            </TouchableOpacity>
          </View>
          <Image source={{ uri: item.images[0] }} style={{ width: 100, height: 100, borderRadius: 8 }} />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>
      <View style={{ backgroundColor: 'black', padding: 20, borderRadius: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 30, color: 'white', marginBottom: 10 }}>Inventory Details</Text>
        </View>
        <Text style={{ fontSize: 15, color: 'white' }}>
          Remaining Items:
          <Text style={{ color: 'blue', fontWeight: 'bold' }}> </Text>
        </Text>
        
      </View>

      <View>
        {BrandItems.length > 0 ? (
          <FlatList
            data={BrandItems}
            renderItem={(item) => renderBrandItem(item)}
            keyExtractor={(item) => item.key}
          />
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 , fontSize:20,color:"red" }}>No items in Your Brand</Text>
        )}
      </View>
    </View>
  );
}

function Productinfo(props) {
  return (
    <View style={{ width: 240, justifyContent: 'space-evenly' }}>
      <Text style={{ fontSize: 25, fontWeight: '400', color: 'black' }}>{props.name}</Text>
      <Text style={{ fontSize: 20, fontWeight: '600', color: 'blue' }}>
        Price: Rs<Text style={{ color: 'black' }}>{props.price}</Text>
      </Text>
    </View>
  );
}
