import { View, Text , SafeAreaView } from 'react-native'
import { CardField, useStripe ,createToken , confirmPayment } from '@stripe/stripe-react-native';
import CardButton from '../CardButton/CardButton';
import createPaymentIntent from '../../API/StripeApi';
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function PaymentComponent() {

const [cardInfo,SetCardInfo]=useState(null)



const Navigation=useNavigation();
const [CartItems, setCartItems] = useState([]);
const [totalPrice, setTotalPrice] = useState([]);
const [userid,setId]= useState(null);

useEffect(() => {
  const unsubscribe = auth().onAuthStateChanged((user) => {
    if (user) {

  setId(user.uid)
      const cartRef = firestore()
        .collection('Customer')
        .doc(user.uid)
        .collection('Cart');
      cartRef.onSnapshot((querySnapshot) => {
        const items = [];
        let total = 0;
        
        querySnapshot.forEach((documentSnapshot) => {
          const item = {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          };
          let value=parseInt(item.price)
         total += value;
          items.push(item);
        });
        setCartItems(items);
        setTotalPrice(total);
        console.log(totalPrice)
        
      
      
      });
    } else {

      setUserId(null);
    }
  });
  return () => unsubscribe();
}, []);
const amount = {totalPrice}









const OnConfirmPressed = async ()=>{

    if(cardInfo==null || totalPrice.toString()<=0){
        alert("Incomplete Card Data/No Items in cart")
    }
    else{


      value=totalPrice.toString()
      console.log(value)
        let data={
            amount: value
        }
        console.log(data)

try {
    
    
    const res =  await createPaymentIntent(data)
    console.log("Payment Intent Created Sucessfully" , res)

if(res?.data?.paymentIntent){


    let payment_confirmed=confirmPayment(res?.data?.paymentIntent,{paymentMethodType:"Card"})
    alert('Payment Made Sucessfully')
    Navigation.navigate("HomeScreen")
    const deleteRef = firestore()
  .collection('Customer')
  .doc(userid)
  .collection('Cart');
deleteRef.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    doc.ref.delete();
  });
  alert('Your Items have been Ordered Sucessfully ')
}).catch((error) => {
  console.error("Error deleting items in Cart: ", error);
});

}



    
} catch (error) {
    console.log("Error Raised During Payment Intent", error)
    
}




// try {
//     const resToken= await createToken({...cardInfo ,type :'Card'})

//     console.log("res token:" ,resToken)
// } catch (error) {

//     console.log("Error:",error)
    
// }


    console.log(cardInfo)
    

}
}

const fecthCardDetails = (CardDetail)=>{

        if(CardDetail.complete){
            console.log("True")
        SetCardInfo(CardDetail)

     
    }
    else{
        SetCardInfo(null)
    }



}


  return (
    <View style={{padding:16}}>
    <SafeAreaView style={{flex:1}}>
    <CardField
      postalCodeEnabled={false}
      placeholders={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
      }}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 30,
      }}
      onCardChange={(cardDetails) => {
       fecthCardDetails(cardDetails)
      }}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
    />


<CardButton   onPress={OnConfirmPressed} disabled= {!cardInfo} />
      <Text>PaymentComponent</Text>
    
    </SafeAreaView>
    </View>
  )
}