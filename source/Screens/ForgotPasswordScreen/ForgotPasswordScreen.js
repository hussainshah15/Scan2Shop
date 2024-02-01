import { View, Text ,Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'
import React, { useState } from 'react';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton/CustomButton';
import CustomLink from '../../Components/CustomLink/CustomLink';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {

    const navigation=useNavigation();

    const SendMailPressed=()=>{
        console.warn("Send Mail pressed");
navigation.navigate("ResetPasswordScreen");
    }
    const BackToSignInPressed=()=>{
        console.warn("Back to Sign in  pressed");
        navigation.navigate("SignInScreen");

    }

const [email,setEmail]=useState("");
  return (
    <ScrollView>
    <View style={styles.main_container}>
     
      <Text style={styles.heading}>Recover Password </Text>
      <CustomInput placeholder="Enter Email" value={email} setValue={setEmail} /> 
      <CustomButton text="Send Email " OnPress={SendMailPressed} /> 
      <CustomLink  text="Back to Sign In" OnPress={BackToSignInPressed}/>
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
    ,
    heading:
    {
        fontSize:24,
        fontWeight:"bold",
        color:"white",
        margin:10,
        marginTop:"45%"    
    }
})


export default ForgotPasswordScreen