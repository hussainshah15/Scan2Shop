import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView , Image , useWindowDimensions} from 'react-native';
import { AuthContext } from '../../Navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import Logo from "../../../assets/images/Logo.png"
import CustomerBottomTab from '../../Components/CustomerBottomTab/CustomerBottomTab'

export default function ProfileScreen() {
    const {height}=useWindowDimensions();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore().collection('Customer').doc(user.uid).get();

        if (userDoc.exists) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user.uid]);

  return (
    <SafeAreaView style={styles.container}>

<Image source={Logo} style={[styles.logo, {height:height*0.3}]}  resizeMode="contain"></Image>
      {userData ? (
        <View style={styles.profileContainer}>
          <Text style={styles.title}> User Profile</Text>
          <Text style={styles.label}>Customer Name:</Text>
          <Text style={styles.text}>{userData.name}</Text>
          <Text style={styles.label}>Registered Email:</Text>
          <Text style={styles.text}>{userData.email}</Text>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading user data...</Text>
      )}

      <View style={styles.bottomTab}>
          <CustomerBottomTab />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"white"
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color:"white"
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    color:"green"
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
});
