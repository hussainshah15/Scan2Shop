import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import Logo from "../../../assets/images/Logo.png";
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton/CustomButton';
import CustomLink from '../../Components/CustomLink/CustomLink';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Navigation/AuthProvider';

const SignInScreen = () => {
  const { login } = useContext(AuthContext);
  const OnSignInPressed = () => {
    if (email === "" || password === "") {
      Alert.alert("Invalid Input", "Please enter both email and password.");
      return;
    }
  
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
  
    // Perform login with email and password
    login(email, password)
      .then(() => {
        Alert.alert('Signing You In', 'Wait for us to sign you in');
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          console.warn("Hello", error);
          Alert.alert(
            'Login Failed',
            'User not found. Please sign up to create an account.',
          );
        } else if (error.code === 'auth/invalid-email') {
          console.warn(error);
          Alert.alert('Login Failed', 'Invalid email format.');
        } else {
          console.warn(error);
          Alert.alert('Login Failed', 'An error occurred. Please try again.');
        }
      });
  };
  
  const OnSignUpPressed = () => {
    Navigation.navigate("StartScreen");
  };

  const OnForgotPassword = () => {
    Navigation.navigate("ForgotPasswordScreen");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { height } = useWindowDimensions();
  const Navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.main_container}>
        <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />
        <CustomInput placeholder="Enter Email " value={email} setValue={setEmail} />
        <CustomInput placeholder="Enter Password" value={password} setValue={setPassword} secureTextEntry={true} />
        <CustomButton text="Sign in " OnPress={OnSignInPressed} />
        <CustomLink text="Forgot Password? " OnPress={OnForgotPassword} />
        <CustomLink text="Don't have an account? Sign up  " OnPress={OnSignUpPressed} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main_container: {
    alignItems: "center",
    padding: 20
  },
  logo: {
    width: "70%",
    height: 200,
    maxWidth: 300,
    maxHeight: 300,
    marginTop: "25%"
  }
});

export default SignInScreen;
