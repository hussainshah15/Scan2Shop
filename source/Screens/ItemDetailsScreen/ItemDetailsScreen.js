import React, { useState, useContext } from 'react';
import { View, Image, Dimensions, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../../Navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import CustomerBottomTab from '../../Components/CustomerBottomTab/CustomerBottomTab';
import { useNavigation } from '@react-navigation/native';

export default function ItemDetailsScreen({ route }) {
  const Item_id = route.params.id;
  const item_name = route.params.name;
  const description = route.params.description;
  const price = route.params.price;
  const image_data = route.params.image;

  const Navigation = useNavigation();
  const { user, logout } = useContext(AuthContext);

  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const enabledItems = ["Garnier Vit C" ,'Coastline']; 

  const OnAddtoCartPressed = async () => {
    try {
      const userId = firebase.auth().currentUser.uid;
      const userDocRef = firebase.firestore().collection('Customer').doc(userId);
      await userDocRef.collection('Cart').add({
        name: item_name,
        price: price,
        image: image_data[0],
      });

      alert('Product added to cart successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  const OnAddtoWishlistPressed = async () => {
    try {
      const userId = firebase.auth().currentUser.uid;
      const userDocRef = firebase.firestore().collection('Customer').doc(userId);
      await userDocRef.collection('Wishlist').add({
        name: item_name,
        price: price,
        image: image_data[0],
      });

      alert('Product added to Wishlist successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  const onViewPressed = () => {
    if (enabledItems.includes(item_name)) {
      console.log("name", item_name)
      Navigation.navigate('ARScreen', { itemName: item_name, itemPrice: price, itemDescription: description ,image:image_data });
    } else {
      Alert.alert('View disabled', 'This item cannot be viewed.');
    }
  };
  

  const renderImages = () => {
    return image_data.map((image, index) => (
      <Image key={index} source={{ uri: image }} style={{ width: windowWidth, height: 300 }} />
    ));
  };

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
    setActiveIndex(slideIndex);
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          {renderImages()}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 10,
            alignSelf: 'center',
          }}>
          {image_data.map((_, index) => (
            <View
              key={index}
              style={{
                height: 8,
                width: 8,
                borderRadius: 4,
                marginHorizontal: 4,
                backgroundColor: index === activeIndex ? 'gray' : 'white',
              }}
            />
          ))}
        </View>
      </View>
      <View style={{ backgroundColor: '#292929', marginTop: 5, borderRadius: 10, padding: 5, flex: 1 }}>
        <Text style={{ fontSize: 30, fontWeight: '500', color: 'white', marginTop: 2, marginBottom: 2 }}>{item_name}</Text>
        <Text style={{ color: 'blue', marginTop: 10, marginBottom: 2 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginTop: 10, marginBottom: 2 }}>Description: </Text>
          {description}
        </Text>
        <Text style={{ color: 'blue', marginTop: 10, marginBottom: 2 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginTop: 10, marginBottom: 2 }}>Price: Rs</Text> {price}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'space-between', marginTop: 5, marginTop: 10, marginBottom: 5 }}>
          <TouchableOpacity
            style={{
              margin: 5,
              backgroundColor: 'green',
              width: 100,
              color: 'white',
              alignItems: 'center',
              padding: 2,
              borderRadius: 4,
              marginRight: 2,
            }}
            onPress={OnAddtoCartPressed}>
            <Text style={{ padding: 2, color: 'white', fontSize: 15 }}>Add to cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              margin: 5,
              backgroundColor: 'blue',
              width: 120,
              color: 'white',
              alignItems: 'center',
              padding: 2,
              borderRadius: 4,
              marginRight: 2,
            }}
            onPress={OnAddtoWishlistPressed}>
            <Text style={{ padding: 2, color: 'white', fontSize: 15 }}>Add to WishList</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              margin: 5,
              backgroundColor: enabledItems.includes(item_name) ? 'grey' : 'lightgray',
              width: 120,
              color: 'white',
              alignItems: 'center',
              padding: 2,
              borderRadius: 4,
              marginRight: 2,
            }}
            onPress={onViewPressed}
            disabled={!enabledItems.includes(item_name)}>
            <Text style={{ padding: 2, color: 'white', fontSize: 15 }}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomerBottomTab />
    </View>
  );
}
