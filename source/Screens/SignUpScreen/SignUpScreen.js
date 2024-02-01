import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../Navigation/AuthProvider';
import RNRestart from 'react-native-restart';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');




    
  
    const handlePress = (type) => {
      setUserType(type);
    
    }


  
  const { register } = useContext(AuthContext);

  const handleSignUp = async () => {
    if (!email || !password || !username || !confirmPassword ) {
      alert('Please enter all required fields.');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address.');
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      alert('Please enter a valid username (letters and numbers only).');
    } else if (password !== confirmPassword) {
      alert('Passwords do not match.');
    } else {
      try {
        const { user } = await auth().createUserWithEmailAndPassword(email, password);
        await firestore().collection('Customer').doc(user.uid).set({
          name: username,
          email: email,
        });
        register(user.uid);
        Alert.alert('Sucess', 'User Registered wait for  the app to sign you in ');
        RNRestart.restart();
      } catch (error) {
        console.log(error);
        alert('Error creating account. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { marginBottom: 50 }]}>Get Started Here</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
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




<TouchableOpacity style={styles.button} onPress={handleSignUp}>
<Text style={styles.buttonText}>Sign Up</Text>
</TouchableOpacity>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',

},
title: {
fontSize: 24,
fontWeight: '300',
color: 'white',
},
input: {
width: '80%',
height: 40,
backgroundColor: '#f2f2f2',
borderRadius: 10,
paddingLeft: 10,
marginTop: 20,
},
button: {
width: '80%',
height: 40,
backgroundColor: '#0080ff',
borderRadius: 10,
marginTop: 40,
justifyContent: 'center',
alignItems: 'center',
},
buttonText: {
color: '#fff',
fontSize: 18,
fontWeight: 'bold',
},
});

export default SignUpScreen;






