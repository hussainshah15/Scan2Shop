import { View, Text ,Image, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import Logo from "../../../assets/images/Logo.png"
import Brand_logo from "../../../assets/images/brand_logo.jpg"
import customer_logo from "../../../assets/images/customer_logo.jpg"
import { useNavigation ,DefaultTheme} from '@react-navigation/native';


const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#222222'
    },
  };


export default function StartScreen() {
    const Navigation=useNavigation();

    
const BrandPressed=()=>{
    
    Navigation.navigate('RegisterBrandsScreen')
}
const CustomerPressed=()=>{
    
    Navigation.navigate("SignUpScreen")
}
    const {height}=useWindowDimensions();
  return (
    <ScrollView>
    <View style={styles.main_container}>
     
      <Image source={Logo} style={[styles.logo, {height:height*0.3}]}  resizeMode="contain" ></Image>
      <Text  style={styles.text_heading}> Lets get you Started</Text>
      <Text  style={styles.text_heading}> Who are you ? </Text>
    
      </View>
      
      <View  style={{flexDirection:"row"}}>
        <TouchableOpacity style={{width:"50%"}} onPress={BrandPressed}>
        <Image source={Brand_logo} style={styles.user_logo} ></Image>
        
        </TouchableOpacity>
        <TouchableOpacity style={{width:"50%"}} onPress={CustomerPressed}>
        <Image source={customer_logo} style={styles.user_logo} ></Image>
        
        </TouchableOpacity>
       
      </View>
    
      </ScrollView>

      
  )
}

const styles = StyleSheet.create({

    main_container:{
alignItems:"center",
padding:20

    },
    logo:{
        width:"80%",
        height:300,
        maxWidth:300,
        maxHeight:300,
        marginTop:"35%"

    }
    ,
    text_heading:{
        color:"white",
        fontSize:25,
        fontWeight:"300"

    },
    text:{
        color:"white",
        fontSize:15,
        fontWeight:"300"

    },
    user_logo:{
        maxHeight:200,
        maxWidth:200,
        marginTop:"5%",
        marginLeft:30
    
    
   
       
   

    }
})