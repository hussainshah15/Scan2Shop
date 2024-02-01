import React, { useState } from 'react';
import { View, Image, Button ,StyleSheet, TouchableOpacity, Text ,Alert  } from 'react-native';
import firebase from '@react-native-firebase/app';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
const ImagePicker= require('react-native-image-picker');

export default function DetectScreen() {
  const [imageUri, setImageUri] = useState(null);
  const Navigation = useNavigation();

  const takePicture = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.assets[0].uri);
        console.log("Image Uri:", imageUri);
      }
    });
  };

  const savePicture = async () => {
    try {
      Alert.alert('You Image is being uploaded');
      const response = await fetch(imageUri);
      const blob = await response.blob();
  
      const filename = 'Testimage.jpg'; // Provide a unique filename for the image
      
      const storageRef = firebase.storage().ref('CustomerTestImage/' + filename);
      await storageRef.put(blob);
  
      const downloadUrl = await storageRef.getDownloadURL();
  
      console.log('Image uploaded to Firebase Storage:', downloadUrl);
      Alert.alert('Image Saved Sucessfully','Lets find your Product');
      Navigation.navigate("ImageComparisonScreen", { imageUri: downloadUrl });
    } catch (error) {
      console.log('Error uploading image to Firebase Storage:', error);
    }
  };

  const deletePicture = () => {
    setImageUri(null);
    console.log('Image deleted');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
        ) : null}
        <TouchableOpacity style={[styles.buttons,{backgroundColor:"blue"}]} onPress={takePicture} >

<Text style={{fontSize:20 ,padding:15 , color:"white"}}>Take Picture</Text>
<Icon name="camera"  size={20} color="white" style={{padding:10}} />

        </TouchableOpacity>
        <TouchableOpacity style={[
            styles.buttons,
            { backgroundColor: imageUri ? 'green' : 'white' },
            !imageUri && styles.disabledButton,
          ]} onPress={savePicture} disabled={!imageUri} >

<Text style={{fontSize:20 ,padding:15 , color:"black"}}>Save Image</Text>
<Icon name="file-image-o"  size={20} color="black" style={{padding:10}} />

        </TouchableOpacity>
        <TouchableOpacity style={[
            styles.buttons,
            { backgroundColor: imageUri ? 'red' : 'white' },
            !imageUri && styles.disabledButton,
          ]} onPress={deletePicture} disabled={!imageUri} >

<Text style={{fontSize:20 ,padding:15 , color:"black"}}>Delete Image</Text>
<Icon name="trash"  size={20} color="black" style={{padding:10}} />

        </TouchableOpacity>
        
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
buttons:{
  margin:20,
  borderRadius:20,
  flexDirection:"row",
  alignItems:"center"

},
 disabledButton: {
    opacity: 0.5,
  },


});
