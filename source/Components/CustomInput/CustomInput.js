import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function CustomInput({value,setValue,placeholder,secureTextEntry}) {
  return (
    <View style={styles.container}>
      <TextInput value={value} onChangeText={setValue} placeholder={placeholder} secureTextEntry={secureTextEntry}></TextInput>
    </View>
  )
}

const styles= StyleSheet.create({

    container:{
        backgroundColor:"white",
        width:"100%",
        borderColor:"#e8e8e8",
        borderWidth: 1,
        borderRadius:10,
        paddingHorizontal:10,
        margin:5 

    }

})