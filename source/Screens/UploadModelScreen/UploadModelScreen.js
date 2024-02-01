import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';


if (!firebase.apps.length) {
  firebase.initializeApp({});
}

const UploadModelScreen = ({ route }) => {
  const navigation = useNavigation();
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [brand_name, setBrandName] = useState(null);
  const brand_id = route.params.brand_id;
  const id = route.params.id;
  const name = route.params.name;
  const image_url = route.params.image;
  const product_description = route.params.description;
  const[modelurl,setmodelurl]= useState([])
  const Navigation = useNavigation();

  const handleFilePicker = async (fileIndex) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (fileIndex === 1) {
        setFile1(res);
      } else if (fileIndex === 2) {
        setFile2(res);
      }
    } catch (err) {
      console.log('Error picking file:', err);
    }
  };
  useEffect(() => {
    const fetchBrandName = async () => {
      try {
        const docRef = firestore().collection('Brand').doc(brand_id);
  
        // Retrieve the document data
        const doc = await docRef.get();
        if (doc.exists) {
          const data = doc.data();
          setBrandName(data.name);
          console.log('Retrieved Brand Name:', brand_name);
        }
      } catch (error) {
        console.log('Name Retrieval Error:', error);
      }
    };
  
    fetchBrandName();
  
    if (file1) {
      console.log('Selected File 1:', file1);
    }
  }, [brand_id, file1]);

  const uploadFilesToFirestore = async () => {
    try {
      if (!file1 || !file2) {
        Alert.alert('Error ! No files selected / Missing files');
        
        return;
      }

     
      const uploadFiles = async () => {
        const fileUploadPromises = [file1, file2].map(async (file) => {
          if (file) {
            const filename = file[0].name;
            console.log('Filename:', filename);
            const filePath = await getLocalFilePath(file[0].uri);
            console.log('Upload FilePath:', filePath);
            const fileRef = firebase
              .storage()
              .ref(`Brands/${brand_name}/Products/${name}/ModelFiles/${filename}`);
            console.log(fileRef);

            try {
              const taskSnapshot = await fileRef.putFile(filePath);
              console.log('Snapshot', taskSnapshot);
              if (!taskSnapshot) {
                throw new Error('Error uploading file');
              }

              const downloadURL = await firebase.storage().ref(taskSnapshot.metadata.fullPath).getDownloadURL();
              console.log('File uploaded:', downloadURL);
              return downloadURL;
            } catch (error) {
              console.log('Error uploading file:', error);
              throw error;
            }
          }
        });

        try {
          const downloadURLs = await Promise.all(fileUploadPromises);
          console.log('All files uploaded successfully:', downloadURLs);
          setmodelurl(downloadURLs)
          Alert.alert('Success', 'Files uploaded successfully');
          // Add your desired navigation or success handling logic here
        } catch (error) {
          console.log('Error uploading files:', error);
        }


        try {
          const userDocRef = firebase.firestore().collection('Brand').doc(brand_id).collection('products').doc(id);

console.log('REf',userDocRef)
          console.log('Productid:', id)
          await userDocRef.collection('ModelFiles').add({
            Modelfiles:modelurl
          });


          alert('Model Files Added to Product successfully!');
          Navigation.navigate("BrandMainScreen");
          
        } catch (error) {
          console.log(error)
        }



      };

      Alert.alert('Uploading Files', 'Please wait while files are being uploaded...');
      uploadFiles();
    } catch (error) {
      console.log('Error uploading files:', error);
    }
  };

  const getLocalFilePath = async (uri) => {
    try {
      console.log(uri);
      if (!uri) {
        throw new Error('Invalid URI');
      }

      let localFilePath = null;

      if (uri.startsWith('content://')) {
        localFilePath = `${RNFetchBlob.fs.dirs.DocumentDir}/${uri.split('/').pop()}`;
        const exists = await RNFetchBlob.fs.exists(localFilePath);

        if (!exists) {
          await RNFetchBlob.fs.cp(uri.replace('file://', ''), localFilePath);
        }
      } else if (uri.startsWith('content://')) {
        const response = await RNFetchBlob.config({ fileCache: true }).fetch('GET', uri);
        localFilePath = response.path();
      } else {
        localFilePath = `${RNFetchBlob.fs.dirs.MainBundleDir}/${uri}`;
      }

      return localFilePath;
    } catch (error) {
      console.log('Error copying asset file:', error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.productInfoContainer}>
        <Image source={{ uri: image_url }} style={styles.productImage} />
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productDescription}>{product_description}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleFilePicker(1)}>
        <Text style={styles.buttonText}>ADD File(.obj)</Text>
      </TouchableOpacity>

      {file1 && (
        <Text style={styles.fileInfo}>
          File 1: {file1.name} ({file1.size} bytes)
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={() => handleFilePicker(2)}>
        <Text style={styles.buttonText}>ADD File(.mtl)</Text>
      </TouchableOpacity>

      {file2 && (
        <Text style={styles.fileInfo}>
          File 2: {file2.name} ({file2.size} bytes)
        </Text>
      )}

      <TouchableOpacity style={styles.uploadButton} onPress={uploadFilesToFirestore}>
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  productDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#4CD964',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  fileInfo: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default UploadModelScreen;
