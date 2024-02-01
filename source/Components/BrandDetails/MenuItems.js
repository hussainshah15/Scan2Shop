import { View, Text , TouchableOpacity , FlatList,ScrollView,Image} from 'react-native'
import React, {useState ,useEffect} from 'react'
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';


export default function MenuItems(props) {
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  const [imagedata, setImagedata] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const userDocRef = firebase.firestore().collection("Brand").doc(props.id);
      const snapshot = await userDocRef.collection("products").get();
      const items = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setItems(items);
      console.log("Items Array", items);
    };

    fetchItems();
  }, []);

  const onMenuItemPressed = (id, name, image , description , price) => {
    navigation.navigate("ItemDetailsScreen", { id, name, image ,description, price });
  };

  const render_menuItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          margin: 5,
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          backgroundColor: "white",
        }}
        onPress={() => {
          onMenuItemPressed(item.id, item.name, item.images, item.description , item.price);
        }}
      >
        
        <Productinfo
          name={item.name}
          description={item.description}
          price={item.price}
        />
        <Image
          source={{ uri: item.images[0] }}
          style={{ width: 100, height: 100, borderRadius: 8 }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={items}
        renderItem={(item) => render_menuItem(item)}
        keyExtractor={(item) => item.id}
      />
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
            <Text style={{fontSize: 15,
                fontWeight: "600",
                color:"blue"}}>Description:  
            
            
            
            <Text style={{ color:"black"}}> {props.description}</Text></Text>
            <Text>
            
            <Text style={{ontSize: 20,
                fontWeight: "600",
                color:"blue"}}>
            Price: Rs<Text style={{ color:"black"}}>{props.price}</Text>
            </Text>
            </Text>

        </View>
    )
}

const ProductImage =(props)=>(
    

    <View  style={{
     
       
    }}>


        <Image source={{uri:props.address}} style={{width:100,height:100,borderRadius:8}}
        />
    </View>
)

 