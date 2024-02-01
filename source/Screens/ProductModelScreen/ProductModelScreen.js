import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity , Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function ProductModelScreen() {
  const [BrandItems, setBrandItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const[no_products,set_productno]=useState(0);
  const navigation = useNavigation();

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
          if (querySnapshot) {
            const items = [];
            let no_products = 0;
            let no_type_product = 1;
            querySnapshot.forEach((documentSnapshot) => {
              const item = {
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              };
              no_products += item.noOfProducts;
              items.push(item);
            });

            set_productno(no_products);
            setBrandItems(items);
          }
        });
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);
  


  const onUploadFiles = (brand_id,id , name , image , description) => {
    navigation.navigate("UploadModelScreen", { brand_id ,id , name , image , description});
  }

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
          <TouchableOpacity onPress={() => onUploadFiles( userId,item.key , item.name, item.images[0] , item.Description)}
         
            style={{
              backgroundColor: 'green',
              padding: 10,
              borderRadius: 5,
              width: 150,
              height: 40,
              marginTop: 10,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 15 }}>Upload Model Files</Text>

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
    <View style={{ flex: 1 , marginTop:10,marginBottom:10}}>
<View style={{backgroundColor:"black" ,padding:20,borderRadius:20}}>

<View style={{alignItems:"center"}}>
<Text  style={{fontSize:30,color:"white",marginBottom:10}}> Your Products </Text>

</View>
</View>



<View>

      {BrandItems.length > 0 ? (
        <FlatList
          data={BrandItems}
          renderItem={(item) => renderBrandItem(item)}
          keyExtractor={(item) => item.key}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No items in Your Brand
        </Text>
      )}
      </View>
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