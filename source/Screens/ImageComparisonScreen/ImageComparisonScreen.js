import React, { useState, useEffect } from 'react';
import { View, Button, Alert, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import Icon from 'react-native-vector-icons/FontAwesome';


if (!firebase.apps.length) {
  firebase.initializeApp({});
}

const ImageComparisonScreen = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const [product_urls, set_product_urls] = useState([]);
  const [productList, setProductList] = useState([]);
  const [urlList, setUrlList] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [similarImages, setSimilarImages] = useState([]);
  const [res_received, setResReceived] = useState(false);
  const [comparison_flag, setComparisonFlag] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(null);

const OnhomePressed=()=>{

navigation.navigate("HomeScreen")

}

const OnCustomerSupportPressed=()=>{

  navigation.navigate("CustomerSupportScreen")
  
  }
  

const OnAddPressed=()=>{

  navigation.navigate("DetectScreen")
  
  }

  
// const onMenuItemPressed = ( name, image , description , price) => {
//     navigation.navigate("ItemDetailsScreen", { name, image ,description, price });
//   };

  const handleImageClick = (image) => {
    console.log("Selected Image URL:", image);
    setSelectedUrl(image);
    
    const matchingProduct = productList.find((product) => product.images.includes(image));
    if (matchingProduct) {
      const { price, description, name ,images } = matchingProduct;
      console.log("Matching Product:", matchingProduct.images);
      navigation.navigate("DetectedProductDetailsScreen", { name, images ,description, price });
     
    }
  };


  useEffect(() => {
    console.log("Urls List:", product_urls);
  }, [urlList]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const brandSnapshot = await firebase.firestore().collection('Brand').get();

        const products = [];
        const urls = [];
        for (const brandDoc of brandSnapshot.docs) {
          const brandName = brandDoc.data().name;
          console.log("BrandName", brandName);

          const productSnapshot = await brandDoc.ref.collection('products').get();
          productSnapshot.forEach((productDoc) => {
            const productName = productDoc.data().name;
            console.log("ProductName:", productName);
            const imageUrls = productDoc.data().images;
            const description = productDoc.data().description;
            const price = productDoc.data().price;

            products.push({
              brand: brandName,
              name: productName,
              images: imageUrls,
              description: description,
              price: price,
            });
            urls.push({
              address: imageUrls
            });
          });
        }

        setUrlList(urls);
        setProductList(products);
        const urls_only = urls.map(item => item.address).flat();
        set_product_urls(urls_only);
        console.log("Urls List:", urls_only);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (urlList.length > 0) {
      const urls_only = urlList.map(item => item.address).flat();
      set_product_urls(urls_only);
    }
  }, [urlList]);

  useEffect(() => {
    if (route.params?.imageUri) {
      setImageUrl([route.params.imageUri]);
    }
  }, [route.params]);

  useEffect(() => {
    console.log('Response Received', res_received);
    console.log('SimilarImagesArray', similarImages); // Log the entire array
  }, [res_received, similarImages]);

  const handleCompareImages = async () => {
    Alert.alert('We are finding your Product', ' Results will be shown Shortly.');
    console.log("Compare pressed");
    console.log('Image1Array', imageUrl);
    

    try {
      //https://scan2shop-201d66120049.herokuapp.com/similar-images
      //http://localhost:8081/similar-images
      const response = await fetch('https://scan2shop-201d66120049.herokuapp.com/similar-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          array1_images: imageUrl,
          array2_images: product_urls, // Add your target URLs here
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle the response data here
        console.log('Response Received', data);
        setResReceived(true);

        setSimilarImages(data.similarImages);
        console.log(data[0]);
        console.log('Length of similar Array', similarImages.length);

        if (data.similarImages.length === 0) {
          setComparisonFlag(true);
          Alert.alert('No Similar Images Found', 'No similar images were found.');
        }
      } else {
        // Handle the error response
        throw new Error('Request failed');
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.log('Error Found', error);
      Alert.alert('Error', 'An error occurred during the request.');
    }
  };


  return (

    
    <View style={styles.container}>
      {similarImages.length > 0 ? (
<View>
<View style={{alignItems:"center"}}>
<Text style={styles.heading_results}>Choose the Most Relevant Product</Text>
</View>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {similarImages.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={styles.imageContainer}
                onPress={() => handleImageClick(image)}
              >
                <Image source={{ uri: image }} style={styles.image} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        <View style={{flexDirection:'row',width:'80%'}}>
        <TouchableOpacity style={{backgroundColor: "green",
    alignItems: "center",
    width: "50%",
    borderRadius: 30,
    marginVertical: 5,
    padding:7,
    flexDirection:"row",
    alignSelf:"center",margin:4}} onPress={OnhomePressed}>
                <Text style={styles.buttonText}>Back to Home</Text>
                <Icon name="backward" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: "green",
    alignItems: "center",
    width: "60%",
    borderRadius: 30,
    marginVertical: 5,
    padding:7,
    flexDirection:"row",
    alignSelf:"center",margin:4}} onPress={OnAddPressed}>
                <Text style={styles.buttonText}>Add new Picture</Text>
                <Icon name="image" size={20} color="black" />
              </TouchableOpacity>
              </View>
        </View>
      ) : (
        <View style={styles.centeredContainer}>
          {comparison_flag ? (
            <View style={styles.noImagesContainer}>
              <Text style={styles.noImagesText}>No similar images found.</Text>
              <TouchableOpacity style={styles.button} onPress={OnAddPressed}>
                <Text style={styles.buttonText}>Add new Picture</Text>
                <Icon name="image" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={OnhomePressed}>
                <Text style={styles.buttonText}>Back to Home</Text>
                <Icon name="backward" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={OnCustomerSupportPressed}>
                <Text style={styles.buttonText}>Contact Support</Text>
                <Icon name="frown-o" size={20} color="black" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.compareButton} onPress={handleCompareImages}>
              <Text style={styles.buttonText}>Find Your Product</Text>
              <Icon name="spinner" size={20} color="black" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollViewContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  imageContainer: {
    borderRadius: 10,
    overflow: "hidden",
    margin: 8,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  noImagesContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noImagesText: {
    color: "red",
    textAlign: "center",
    fontSize: 15,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "green",
    alignItems: "center",
    width: "50%",
    borderRadius: 30,
    marginVertical: 8,
    padding:7,
    flexDirection:"row",
    alignSelf:"center"
  },
  buttonText: {
    color: "black",
    fontSize: 19,
    padding: 10,
  },
  compareButtonContainer: {
    alignSelf: "center",
    margin: 10,
  },
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
  
  },
  compareButton: {
    backgroundColor: "green",
    alignItems: "center",
    width: "50%",
    borderRadius: 30,
    marginVertical: 8,
    flexDirection:"row",
    padding:5
  },
  buttonText: {
    color: "black",
    fontSize: 19,
    padding: 10,
  },
  heading_results:{

    fontSize:20,
    margin:5,
    color:"white",
    fontWeight:'400'
  }
});

export default ImageComparisonScreen;
