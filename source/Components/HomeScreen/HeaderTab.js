import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
const HeaderTab = () => {



  const Navigation = useNavigation();
  const onCartPressed = () => {
    Navigation.navigate("CustomerCartScreen");
  }
  const onProfilePressed = () => {
    Navigation.navigate("ProfileScreen");
  }


  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
      <Icon name="user-circle" size={30} color="#fff" onPress={onProfilePressed}/>
   
      </View>
      <Text style={styles.title}>Scan 2 Shop</Text>
      <View style={styles.iconContainer}>
      <TouchableOpacity  onPress={onCartPressed} >
        <Icon name="shopping-cart"  size={30} color="#fff" />
      </TouchableOpacity>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 10,
  },
  iconContainer: {
    width: 30,
    flexDirection:'row',
    margin:10,
    alignItems:"center",
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '500',
  },
});

export default HeaderTab;
