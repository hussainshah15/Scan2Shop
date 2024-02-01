import { View, Text, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import CustomButton from '../../Components/CustomButton/CustomButton';
import { AuthContext } from '../../Navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import Brands_Navigation from '../../Navigation/BrandsStack';
import SearchBar from '../../Components/HomeScreen/SearchBar';
import HeaderTab from '../../Components/HomeScreen/HeaderTab';
import Categories from '../../Components/HomeScreen/Categories';
import CustomerBottomTab from '../../Components/CustomerBottomTab/CustomerBottomTab';

if (!firebase.apps.length) {
  firebase.initializeApp({});
}

export default function ChildrenWearScreen() {
  const { user, logout } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  const [imageuri, seturi] = useState("");
  const Navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
  try {
    const snapshot = await firestore()
    .collection('Brand')
    .where('Brand_Category', '==', 'ChildrenWear')
    .get();

    if (snapshot.empty) {
      console.log('No items found');
      return;
    }

    const items = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setItems(items);
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};


    fetchItems();




  }, []);

  const checkIfUserExists = async (userId) => {
    const userRef = firestore().collection("Brands").doc(user.uid);
    const doc = await userRef.get();
    if (doc.exists) {

      console.log('User already exists in Firestore');

    }
    else {
      console.log("User does not exist")
    }
  }

  const handlePress = () => {
    // replace with your user id
    checkIfUserExists(user.uid);
  };

  const OnLogoutPressed = () => {
    logout();
  };

  const onBrandPressed = (id , name , image , description) => {
    Navigation.navigate("BrandsDetailsScreen", { id , name , image , description});
  }

  const render_menuItem = ({ item }) => (
 
    <View style={styles.item}>
      <TouchableOpacity onPress={() => onBrandPressed(item.id , item.name, item.imageUrl , item.Description)}>
        <BrandImage image={item.imageUrl} />
        <BrandInfo name={item.name} description={item.Description} />
      </TouchableOpacity>
    </View>

  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ backgroundColor: "#1F1F1F", marginBottom: 3 }}>
          <HeaderTab />
        </View>
        <View style={{ backgroundColor: "#1F1F1F" }}>
          <SearchBar />
        </View>

        <Categories />

        <View style={styles.text_container}>
          <Text style={styles.text}> ChildrenWear Brand to shop from </Text>
        </View>

        {items.length > 0 ? (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={render_menuItem}
          />
        ) : (
          
          <View style={{alignItems:"center",justifyContent:"center"}}>
          <Text style={styles.noItemsText}>Currently no Brands are Present ;(</Text>
          </View>
        )}

       
        <View style={styles.bottomTab}>
          <CustomerBottomTab />
        </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  noItemsText:{
fontSize:25,
color:"red"
  },

  text_container:{ alignItems:"center"},
  text: {

    color: 'white',
    fontSize: 20,
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    }
  }

});

const BrandImage = (props) =>(
        
    <><Image

        source={{
            uri: props.image
        }}
        style={{ width: "100%", height: 200 }} />
        <TouchableOpacity activeOpacity={0.5} style={{
            position:"absolute",
            right:20
            ,top:20
        }}>
   
        </TouchableOpacity >
        
        
        </>

    
    
)




const BrandInfo = (props) =>(
    <View   style={{
        marginTop:10,
        borderWidth:0.5,
        padding:8,
        borderRadius:10,
        backgroundColor:"#b4b4b4"

    }}>
        <View>
    <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>{props.name}</Text>
    
    </View>
    <View style={{marginTop:5}}>
    <Text style={{fontSize:15,fontWeight:"400",color:"blue"}}>{props.description}</Text>
    
    </View>

    </View>
)