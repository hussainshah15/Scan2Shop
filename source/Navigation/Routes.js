 import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Auth_Navigation from './AuthStack';
import Brands_Navigation from './BrandsStack';
import App_Navigation from './AppStack';
import { AuthContext } from './AuthProvider';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#222222'
  },
};

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [usertype, setUsertype] = useState("");

  const onAuthStateChanged = async (user) => {
    setUser(user);
    if (initializing) setInitializing(false);

    if (user) {
      // Check if the user exists in the 'Brands' collection
      const userRef = firestore().collection('Brand').doc(user.uid);
      const doc = await userRef.get();
      if (doc.exists) {
        setUsertype("Brand");
      } else {
        setUsertype("Customer");
      }
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer theme={MyTheme}>
      {user ? (
        usertype=="Customer" ? (
          <App_Navigation />
        ) : (
          <Brands_Navigation/>
        )
      ) : (
        <Auth_Navigation />
      )}
    </NavigationContainer>
  );
};

export default Routes;
