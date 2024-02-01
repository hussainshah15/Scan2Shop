import { View, Text ,Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'
import React, { useContext, useState } from 'react';
import Logo from "../../../assets/images/Logo.png"
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton/CustomButton';
import CustomLink from '../../Components/CustomLink/CustomLink';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Navigation/AuthProvider';




const BrandSignInScreen = () => {

const {login} = useContext(AuthContext);



    const OnSignInPressed=()=>{
        login(email,password)
        console.warn("Sign in");

    

    }

    const OnRegisterBrandPressed=()=>{
        console.warn("Sign up pressed");
        Navigation.navigate("RegisterBrandsScreen")

    }
    const OnForgotPassword=()=>{
        console.warn("Forgot Password Pressed");
Navigation.navigate("ForgotPasswordScreen");
    }
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
    const {height}=useWindowDimensions();
    const Navigation=useNavigation();

  return (
    <ScrollView>
    <View style={styles.main_container}>
      <Image source={Logo} style={[styles.logo, {height:height*0.3}]}  resizeMode="contain"></Image>
      <CustomInput placeholder="Enter Email " value={email} setValue={setEmail} /> 
      <CustomInput placeholder="Enter Password" value={password} setValue={setPassword} secureTextEntry={true}/>   
      <CustomButton text="Sign in " OnPress={OnSignInPressed} /> 
      <CustomLink text="Forgot Password? " OnPress={OnForgotPassword}/>
      <CustomLink text="Havent Registered Yet? Register your Brand Now  " OnPress={OnRegisterBrandPressed}/>

      </View>
      </ScrollView>
  )
};

const styles = StyleSheet.create({

    main_container:{
alignItems:"center",
padding:20

    },
    logo:{
        width:"70%",
        height:200,
        maxWidth:300,
        maxHeight:300,
        marginTop:"25%"

    }
})


export default BrandSignInScreen