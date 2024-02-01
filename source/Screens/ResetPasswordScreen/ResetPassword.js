import { View, Text ,Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'
import React, { useState } from 'react';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton/CustomButton';
import CustomLink from '../../Components/CustomLink/CustomLink';
import { useNavigation } from '@react-navigation/native';


const ResetPasswordScreen = () => {


const navigation=useNavigation();
    const ResetPasswordPressed=()=>{
        console.warn("Reset Password pressed");

    }
    const BackToSignInPressed=()=>{
        console.warn("Back to Sign in  pressed");
        navigation.navigate("SignInScreen");

    }

const [confirmationCode,setConfirmationCode]=useState("");
const [password,setPassword]=useState("");

  return (
    <ScrollView>
    <View style={styles.main_container}>
     
      <Text style={styles.heading}>Reset your  Password </Text>
      <CustomInput placeholder="Enter Confirmation Code" value={confirmationCode} setValue={setConfirmationCode} /> 
      <CustomInput placeholder="Enter new  Password" value={password} setValue={setPassword} secureTextEntry={true} /> 
      <CustomButton text="Reset Password " OnPress={ResetPasswordPressed} /> 
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


export default ResetPasswordScreen