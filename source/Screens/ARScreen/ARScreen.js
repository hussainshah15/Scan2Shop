import React, { useState ,useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
  ViroARSceneNavigator,
  ViroARScene,
  Viro3DObject,
  ViroMaterials,
  ViroAnimations,
  ViroAmbientLight,ViroText
} from '@viro-community/react-viro';
import { useNavigation } from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import RNRestart from 'react-native-restart';










const infoStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 300,
    height: 300,
    marginLeft: -150,
    marginTop: -150,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  heading_text: {
    color: 'black',
    fontSize: 24,
    marginBottom: 20,
    fontWeight:"bold"
  },
 
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});


// Register the materials for the 3D object
ViroMaterials.createMaterials({
  red: {
    diffuseColor: '#ff0000',
  },
  green: {
    diffuseColor: '#00ff00',
  },
  blue: {
    diffuseColor: '#0000ff',
  },
});

// Register the animations for the 3D object
ViroAnimations.registerAnimations({
  rotate: {
    duration: 1000,
    properties: {
      rotateY: '+=90',
    },
  },
});

const InitialScene = ({ productName, itemPrice, itemDescription }) => {


  
let modelFilePath = '';
let mtlFilePath = '';

if (productName === "Garnier Vit C") {
  modelFilePath = require('../../../assets/Models/model1/usdz.obj');
  mtlFilePath = require('../../../assets/Models/model1/usdz.mtl').default;
} else if (productName ===  "Coastline") {
  modelFilePath = require('../../../assets/Models/model2/usdz.obj');
  mtlFilePath = require('../../../assets/Models/model2/usdz.mtl').default;
}

  return (
    <ViroARScene>
      <ViroAmbientLight color="#FFFFFF" intensity={1000}/>
     
      <ViroText
        text={productName}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0.4, -1]}
        style={infoStyles.text}
      />
     <Viro3DObject
  source={modelFilePath}
  resources={mtlFilePath}
  position={[0, -0.1, -1]}
  scale={[0.8, 0.8, 0.8]}
  type="OBJ"
  animation={{ name: 'rotate', loop: true, run: true }}
/>







      <ViroText
        text={`Price: ${itemPrice}`}
        scale={[0.3, 0.3, 0.3]}
        position={[0, 0.4, -1]}
        style={infoStyles.text}
      />
      <ViroText
        text={`Description: ${itemDescription}`}
        scale={[0.3, 0.3, 0.3]}
        position={[0, 0.3, -1]}
        style={infoStyles.text}
      />
    </ViroARScene>
  );
};


export default function ARScreen({ route }) {
  const itemName = route.params?.itemName || '';
  const item_Price = route.params?.itemPrice || '';
  const item_Description = route.params?.itemDescription || '';
  const image_data = route.params.image;


  const Navigation=useNavigation();
  const OnAddtoCartPressed = async () => {
    try {
      const userId = firebase.auth().currentUser.uid;
      const userDocRef = firebase.firestore().collection('Customer').doc(userId);
      await userDocRef.collection('Cart').add({
        name: itemName,
        price: item_Price,
        image: image_data[0],
      });

      Alert.alert('Product added to cart successfully!');
      RNRestart.restart();
      
    } catch (error) {
      console.log(error);
    }
  };

  const addToWishlist = async () => {
    try {
      const userId = firebase.auth().currentUser.uid;
      const userDocRef = firebase.firestore().collection('Customer').doc(userId);
      await userDocRef.collection('Wishlist').add({
        name: itemName,
        price: item_Price,
        image: image_data[0],
      });

      Alert.alert('Product added to cart successfully!');
      RNRestart.restart();
      
    } catch (error) {
      console.log(error);
    }
  };
  const OnhomePressed = async () => {
   
      RNRestart.restart();
      
   
  };

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        initialScene={{
          scene: () => (
            <InitialScene
              productName={itemName}
              itemPrice={item_Price}
              itemDescription={item_Description}
            />
          ),
        }}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={OnAddtoCartPressed}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={addToWishlist}>
          <Text style={styles.buttonText}>Add to Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={OnhomePressed}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
 width:'100%',
    flexDirection: 'row',
    justifyContent:"center",
    alignItems:"center"
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

 