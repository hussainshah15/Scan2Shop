import React, { Children, createContext, useState } from "react";
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user,setUser]=useState(null);
    return(
    <AuthContext.Provider value={{
user,setUser,
login: async(email,password)=>{
try{
    await auth().signInWithEmailAndPassword(email,password);

}
catch(e){
    console.warn(e);

}

},
register: async (email,password) =>{
     try{
        await auth().createUserWithEmailAndPassword(email,password);

     }
 catch(e){
    console.warn(e);

}
},
logout: async () =>{
    try{
await auth().signOut();
    }
    catch(e){
        console.warn(e);
    
    }
}



    }}
    
    
    >
        {children}
    </AuthContext.Provider>)
}

