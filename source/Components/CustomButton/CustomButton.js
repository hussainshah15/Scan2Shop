import { View, Text, StyleSheet, Pressable, } from 'react-native'
import React from 'react'

export default function CustomButton({OnPress , text}) {
  return (
    <Pressable onPress={OnPress} style={styles.container}>
      <Text style={styles.text }>{text}</Text>
    </Pressable>
  )


}
const styles=StyleSheet.create({
    container:{
        backgroundColor:"#292B3B",
width:"100%",
padding:15,
marginVertical:5,
alignItems:"center",
borderRadius:5,

    },

    text:{
fontWeight:"bold",
color:"white"
    },





})
