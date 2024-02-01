import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Image, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
const Scan2ShopLogo = require('../../../assets/images/Logo.png');
export default function CustomerSupportScreen() {

  const Navigation = useNavigation();
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [complaint, setComplaint] = useState('');

  const handleSubmit = () => {
    if (name && subject && complaint) {
      // Create a new document in the 'complaints' collection
      firestore()
        .collection('complaints')
        .add({
          name,
          subject,
          complaint,
        })
        .then(() => {
            Alert.alert("Complaing lodged Sucessfully")
          console.log('Complaint submitted successfully!');
          Navigation.navigate("HomeScreen")
          // Clear the input fields
          setName('');
          setSubject('');
          setComplaint('');
        })
        .catch((error) => {
          console.log('Error submitting complaint:', error);
        });
    } else {
      console.log('Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>

<View style={{alignItems:"center", justifyContent:"center"}}>
<Image source={Scan2ShopLogo} style={styles.logo} />
</View>

      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Subject:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the subject of your complaint"
        value={subject}
        onChangeText={setSubject}
      />

      <Text style={styles.label}>Complaint:</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Write your complaint"
        multiline
        numberOfLines={4}
        value={complaint}
        onChangeText={setComplaint}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
   
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:"white"
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  multilineInput: {
    height: 100,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
