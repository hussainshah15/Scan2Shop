import axios from "axios";


const createPaymentIntent=(data)=>{



    return new Promise((resolve,reject)=>{
        axios.post('https://scan2shop-stripe-api-008b66a691b3.herokuapp.com/payment-sheet',data).then(function(res){
                 resolve(res)
        }).catch(function(error){
            reject(error)
        })
    })
}


export default createPaymentIntent