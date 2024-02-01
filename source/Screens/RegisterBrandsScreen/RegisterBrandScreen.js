import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../Navigation/AuthProvider';
import RNRestart from 'react-native-restart';

const ImagePicker = require('react-native-image-picker');

const RegisterBrandScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [brand_description, set_description] = useState('');

  const { register } = useContext(AuthContext);

  const categories = [
    { label: 'MensWear', value: 'MensWear' },
    { label: 'WomenWear', value: 'WomenWear' },
    { label: 'ChildrenWear', value: 'ChildrenWear' },
    { label: 'Others', value: 'Others' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('Others');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleSelectCategory = (value) => {
    setSelectedCategory(value);
    setIsDropdownOpen(false);
  };

  const handleSignUp = async () => {
    if (!email || !brand_description || !password || !username || !confirmPassword || !image) {
      alert('Please enter all required fields.');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address.');
    } else if (password !== confirmPassword) {
      alert('Passwords do not match.');
    } else {
      setLoading(true);
      try {
        const { user } = await auth().createUserWithEmailAndPassword(email, password);
        const imageRef = storage().ref(`Brands/${username}/logo/${user.uid}`);
        await imageRef.putFile(image.assets[0].uri);
        const imageUrl = await imageRef.getDownloadURL();
        await firestore().collection('Brand').doc(user.uid).set({
          name: username,
          email: email,
          Brand_Category: selectedCategory,
          Description: brand_description,
          imageUrl: imageUrl,
        });
        register(user.uid);
        Alert.alert('Registration Successful', 'Your account has been registered.', [ 
       RNRestart.Restart(),
        
        ]);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChooseImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
    };
    const image = await ImagePicker.launchImageLibrary(options);
    setImage(image);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { marginBottom: 50 }]}>Get Started Here</Text>
      {image && <Image source={{ uri: image.assets[0].uri }} style={styles.image} />}
      <TouchableOpacity style={styles.imageButton} onPress={handleChooseImage}>
        <Text style={styles.imageButtonText}>Upload Brand Logo</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Brand Name"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Tagline"
        value={brand_description}
        onChangeText={(text) => set_description(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
      />

      <View style={{ flexDirection: 'row', alignContent: 'flex-start' }}>
        <Text style={{ fontSize: 15, color: 'white' }}>Brand Category(click to change):</Text>
        <TouchableOpacity style={{ marginLeft: 4, marginRight: 4 }} onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
          <Text style={{ fontSize: 15, color: 'blue' }}>{selectedCategory}</Text>
        </TouchableOpacity>
        {isDropdownOpen && (
          <View>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.value}
                onPress={() => handleSelectCategory(category.value)}
              >
                <Text style={{ fontSize: 15, color: 'blue' }}>{category.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: '80%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#00bfff',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  imageButton: {
    backgroundColor: '#3700B3',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  imageButtonText: {
    color: 'white',
    fontWeight: '400',
  },
});

export default RegisterBrandScreen;
