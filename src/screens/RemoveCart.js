import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image,ScrollView} from "react-native";
import React,{useState,useEffect} from "react";
import {Picker} from "@react-native-picker/picker";

const RemoveCart = ({route,navigation})=>{
    const myEmail=route.params.myEmail; 
    const cart_id=route.params.cart_id; 
    const getUserDate = async () =>{
        
        var fetchInsertApi="https://cucina.com.pk/api/user/remove_cart.php";
        var headers={
            'Accept':'application/json',
            'Content-Type':'application.json'
        };

        var Data={
            cart_id:cart_id,
            
        };
        fetch(fetchInsertApi,
            {
               method:'POST',
               headers:headers,
               body:JSON.stringify(Data), 
            }).then((response) => response.json())
            .then((response) =>
             {
                 if(response[0].Message == "Cart Remove")
                 {
              
                    navigation.navigate("Cart",{myEmail : `${myEmail}`});
                 }
                 else{
                  alert('Cart Not Remove Please Go Back And Try Again');
                 }
             }
            ).catch((error) =>
            {
                console.log(error);
                alert("Error"+error);
            });

       
    };
    
    useEffect( () => {
      getUserDate();
    }),[];

    




    return(
        <View style={{marginTop:150}}>
          <Text style={{textAlign:'center',color:'#800080',fontSize:20,fontWeight:'bold'}}>Removing Cart Please Wait.....</Text>
        </View>
    );
}

export default RemoveCart;