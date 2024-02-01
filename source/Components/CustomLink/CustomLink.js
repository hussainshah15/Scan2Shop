
import { View, Text, StyleSheet, Pressable, } from 'react-native'
import React from 'react'

export default function CustomLink({OnPress , text, type}) {
  return (
    <Pressable onPress={OnPress} style={styles.container}>
      <Text style={styles.text }>{text}</Text>
    </Pressable>
  )


}
const styles=StyleSheet.create({
    container:{
       
width:"100%",
padding:15,
marginVertical:5,
alignItems:"center",
borderRadius:5,

    },

    text:{
fontWeight:"bold",
color:"blue"
    },





})
