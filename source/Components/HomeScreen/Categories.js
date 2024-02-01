import React, { useState } from "react";
import{View,Text, TouchableOpacity, Image, ScrollView} from "react-native"
import {useNavigation} from '@react-navigation/native'


const items=[
    {

    images: require("../../../assets/images/brands.png"),
    text:"Brands"
    

}, {

    images: require("../../../assets/images/acessories.png"),
    text:"Accesories"
    

},
{

    images: require("../../../assets/images/menswear.png"),
    text:"MensWear"
    

} ,{

    images: require("../../../assets/images/womenwear.png"),
    text:"WomenWear"
    

}, {

    images: require("../../../assets/images/childrenwear.png"),
    text:"ChildrenWear"
    

}
]




export default function Categories()

{
    
    
    
    const navigation = useNavigation();
    
    const OnBrandsPressed = ()=>{
        navigation.navigate("HomeScreen")
    }
    
    const OnMensWearPressed = ()=>{
        navigation.navigate("MensWearScreen")
    }
    const OnWomanWearPressed = ()=>{
        navigation.navigate("WomanWearScreen")
    }
    const OnChildrenWearPressed = ()=>{
        navigation.navigate("ChildrenWearScreen")
    }

    return(
        <View
        style={{
            marginTop:5,
            paddingVertical:10,
            paddingLeft:20,
            borderWidth:1,
            borderRadius:10,
            borderColor:"white",
            marginBottom:5
        }}
        >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            

            
            <TouchableOpacity style={{alignItems:"center",marginRight:30,}} onPress={OnBrandsPressed}

            
>
            <Image source={items[0].images} 
            style={{

                width:50,
                height:40,
                resizeMode:"contain"

            }}

            
            ></Image>
            <Text style={{
                fontSize:13,
                fontWeight:"900",
                color:"white"
                
            }}>{items[0].text}</Text>
            </TouchableOpacity>
           
            <TouchableOpacity style={{alignItems:"center",marginRight:30}} onPress={OnMensWearPressed}>
            <Image source={items[2].images} 
            style={{

                width:50,
                height:40,
                resizeMode:"contain"

            }}

            
            ></Image>
            <Text style={{
                fontSize:13,
                fontWeight:"900",
                color:"white"
                
            }}>{items[2].text}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems:"center",marginRight:30}} onPress={OnWomanWearPressed}>
            <Image source={items[3].images} 
            style={{

                width:50,
                height:40,
                resizeMode:"contain"

            }}

            
            ></Image>
            <Text style={{
                fontSize:13,
                fontWeight:"900",
                color:"white"
                
            }}>{items[3].text}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems:"center",marginRight:30}} onPress={OnChildrenWearPressed}>
            <Image source={items[4].images} 
            style={{

                width:50,
                height:40,
                resizeMode:"contain"

            }}

            
            ></Image>
            <Text style={{
                fontSize:13,
                fontWeight:"900",
                color:"white"
                
            }}>{items[4].text}</Text>
            </TouchableOpacity>
        </ScrollView>
        </View>
    )
}