import { View, Text } from 'react-native'

import { AuthContext } from '../../Navigation/AuthProvider';
import React, { useContext ,useState ,useEffect} from 'react';
import About from '../../Components/BrandDetails/About';
import MenuItems from '../../Components/BrandDetails/MenuItems';
import { useNavigation } from '@react-navigation/native';
import CustomerBottomTab from '../../Components/CustomerBottomTab/CustomerBottomTab';


export default function BrandsDetailsScreen({route}) {

  const user_id=route.params.id
  const brand_name=route.params.name
  const Image_url=route.params.image
  const tagLine=route.params.description
 

    const { user, logout} = useContext(AuthContext);

  
  
  
  
    return (
    <View style={{flex:1}}>
    <View>
<About image={Image_url} name={brand_name} disc={tagLine} />
</View>
    
      <View style={{marginTop:5,flex:1}} >

        <MenuItems  id={user_id}/>
      </View>
      <CustomerBottomTab/>
    </View>
  )
}