import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Image, ScrollView , Text, SafeAreaView , Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import { AuthContext } from '../../Navigation/AuthProvider';
import HeaderTab from '../../Components/HomeScreen/HeaderTab';

const AddProductScreen = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [noOfProducts, setNoOfProducts] = useState('');
  const [images, setImages] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const [brandname,setbrandname]=useState("");
  const addItemIcon = require('../../../assets/images/Brand_icons/new_product_icon.png')
  const Navigation=useNavigation();
  





  const ImagePicker= require('react-native-image-picker')
  const handleImagePicker = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const docRef = firestore().collection("Brand").doc(user.uid);

        // Retrieve the document data
        docRef.get().then((doc) => {
          if (doc.exists) {
            const data = doc.data();
          
            setbrandname(data.name)
            console.log(brandname);
          }
        })

     
        console.log(response.assets[0].uri)
        setImages([...images, response.assets[0].uri]);
      }
    });
  };

  const uploadImages = async () => {
    const imageURI=[];
    // console.log('working')
    // console.log("Images",images)
    const promises = images.map((imageUri) => {

      // console.log("Image Uri",imageUri)
      const filename = imageUri.split('/').pop();
      const storageRef = firebase.storage().ref(`Brands/${brandname}/Products/${productName}/${filename}`);
      // console.log("Storage Ref",storageRef)
      const task = storageRef.putFile(imageUri);
      imageURI.push(task)
      console.log("Array",imageURI)
     
      return task;
    });
    const uploadTasks = await Promise.all(promises);
    console.log("Promises:", promises)

    const imageUrls = await Promise.all(

      imageURI.map(async (task) => {
        
        const downloadUrl = await task._ref.getDownloadURL();
        console.log(downloadUrl)
        return downloadUrl;
      })
    );
    return imageUrls;
  };

  const addProduct = async () => {


    Alert.alert('Registering Product', 'We Are registering your new Product . Kindly Wait ');
    if (!productName || !productDescription || !productPrice || !noOfProducts || images.length === 0) {
      alert('Please fill in all the fields and select at least one image');
      return;
    }
    
    try {
      const userId = firebase.auth().currentUser.uid;
      const userDocRef = firebase.firestore().collection('Brand').doc(userId);
      const imageUrls = await uploadImages();
      await userDocRef.collection('products').add({
        name: productName,
        description: productDescription,
        price: productPrice,
        noOfProducts: noOfProducts,
        images: imageUrls,
      });
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setNoOfProducts('');
      setImages([]);
      alert('Product added successfully!');
      Navigation.navigate("BrandMainScreen")

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{flex:1}}>
   <View>
   
    <ScrollView>
   
  
      <View style={styles.container}>
       <View >
       <View style={{alignItems:"center"}}>
       <Text style={styles.title}>ADD Your Products </Text>

       <Image  style ={styles.icon} source={addItemIcon}/>
       </View>
        <TextInput
          style={styles.input}
          placeholder="Product name"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={styles.input}
          placeholder="Product description"
          value={productDescription}
          onChangeText={setProductDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Product price"
          value={productPrice}
          onChangeText={setProductPrice}
        />
        <TextInput
          style={styles.input}
          placeholder="Number of products"
          value={noOfProducts}
          onChangeText={setNoOfProducts}
        />
        <View style={{flexDirection:"row" , }}>
        <View style={{marginTop:10,marginLeft:10}}>
        <Button  title="Choose Images" onPress={handleImagePicker} />
        </View>
        <View style={{marginTop:10,marginLeft:110}}>
        <Button title="Add Product" onPress={addProduct}  />
        </View>
        </View>
        
        <View style={styles.imageContainer}>
          {images.map((imageUri) => (
            <Image key={imageUri} source={{ uri: imageUri }} style={styles.image} />
          ))}
        </View>
      

        </View>
      </View>
    </ScrollView>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
 
 title:{ fontSize:30, color:"white"
 ,marginBottom:50},
 
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor:"white",
    padding: 10,
    marginBottom: 10,
    borderRadius:10
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin:5
  },
  icon:{
height:150,
width:150,
marginBottom:10

  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default AddProductScreen;