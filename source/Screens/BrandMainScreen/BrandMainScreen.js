import { View, Text ,SafeAreaView ,StyleSheet ,TouchableOpacity ,Image ,Alert } from 'react-native'
import React, { useContext ,useState, useEffect } from 'react';
import { AuthContext } from '../../Navigation/AuthProvider';
import CustomButton from '../../Components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';



export default function BrandMainScreen() {
 
  const [brandName, setBrandName] = useState('');
  const [brandLogo, setBrandLogo] = useState('');

  const { user, logout } = useContext(AuthContext);
  const Navigation=useNavigation();
  const OnAddProduct=()=>{
  
Navigation.navigate("AddProductScreen");
}
const OnMyProducts=()=>{
 
Navigation.navigate("BrandProductsScreen");
}
const OnInventory=()=>{

Navigation.navigate("BrandInventoryScreen");
}
const OnModel=()=>{
  
Navigation.navigate("ProductModelScreen");
}

  useEffect(() => {
    fetchBrandData();
  }, []);

  const fetchBrandData = async () => {
    try {
      const brandDoc = await firestore().collection('Brand').doc(user.uid).get();
      if (brandDoc.exists) {
        const brandData = brandDoc.data();
        setBrandName(brandData.name);
        setBrandLogo(brandData.imageUrl);
      }
    } catch (error) {
      console.error('Error fetching brand data: ', error);
    }
  };

  const OnLogoutPressed = () => {
    logout();
  };

  const Brand_categories = [
    {
      id: 1,
      images: require('../../../assets/images/Brand_icons/add_product.png'),
      text: 'Add New Product',
    },
    {
      id: 2,
      images: require('../../../assets/images/Brand_icons/brand_products.png'),
      text: 'Your Products',
    },
    {
      id: 3,
      images: require('../../../assets/images/Brand_icons/inventory.png'),
      text: 'My Inventory',
    },
    {
      id: 4,
      images: require('../../../assets/images/Brand_icons/brand_orders.jpg'),
      text: 'Your Orders',
    },
    {
      id: 5,
      images: require('../../../assets/images/Brand_icons/brand_orders.jpg'),
      text: 'Add Models',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View>
    
        <View style={styles.center_heading_container}>
          <Text style={styles.title}>Welcome to {brandName} Dashboard</Text>
        </View>
        <View style={styles.center_heading_container}>
          {brandLogo && <Image source={{ uri: brandLogo }} style={styles.logo} />}
        </View>
        <View style={styles.image_container}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ borderColor: 'white', borderWidth: 1, padding: 5, borderRadius: 20, alignItems: 'center' }}
            onPress={OnAddProduct}
          >
            <Image source={Brand_categories[0].images} style={styles.Image_style} />
            <Text style={styles.text}>{Brand_categories[0].text}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            style={{ marginLeft: 45, borderColor: 'white', borderWidth: 1, padding: 5, borderRadius: 20, alignItems: 'center' }}
            onPress={OnMyProducts}
          >
            <Image source={Brand_categories[1].images} style={styles.Image_style} />
            <Text style={styles.text}>{Brand_categories[1].text}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.image_container}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ borderColor: 'white', borderWidth: 1, padding: 5, borderRadius: 20, alignItems: 'center' }}
            onPress={OnInventory}
          >
            <Image source={Brand_categories[2].images} style={styles.Image_style} />
            <Text style={styles.text}>{Brand_categories[2].text}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            style={{  marginLeft: 45, borderColor: 'white', borderWidth: 1, padding: 5, borderRadius: 20, alignItems: 'center' }}
            onPress={OnModel}
          >
            <Image source={Brand_categories[4].images} style={styles.Image_style} />
            <Text style={styles.text}>{Brand_categories[4].text}</Text>
          </TouchableOpacity>
        </View>
      
      
        <View style={{ bottom: 0 }}>
          <CustomButton text={'Logout'} OnPress={OnLogoutPressed} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image_container: {
    flexDirection: 'row',
    marginTop: 50,
    marginLeft: 25,
    marginRight: 25,
  },
  Image_style: {
    height: 150,
    width: 150,
  },
  center_heading_container: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius:20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'white',
    padding: 2,
  },
  text: {
    fontSize: 15,
    color: 'white',
    marginTop: 5,
  },
});