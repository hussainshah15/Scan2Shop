import { View, Text, Image } from 'react-native'
import React from 'react'





export default function About(props) {
  return (
    <View>
        <BrandImage image={props.image}/>
        <BrandTitle title={props.name}></BrandTitle>
        <Description disc={props.disc}></Description>
    
    </View>
  )
}


const BrandImage=(props)=>(
    
    <Image source={{uri:props.image}} style={{

        width:"100%",
        height:180
    }}/>

)

const BrandTitle=(props)=>(

    <Text style={{

        fontSize:29,
        fontWeight:"600",
        marginTop:10,
        marginHorizontal:15,
        color:"white"
    }}>{props.title}</Text> 

)


const Description=(props)=>(

<Text style={{
    marginTop:10,
    marginHorizontal:15,
    fontWeight:"400",
    fontSize:15,
    color:"white"
}}>{props.disc}</Text>

)