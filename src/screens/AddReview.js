import {View,Text,StyleSheet,TextInput,Button,TouchableOpacity,Alert,Image,FlatList,ScrollView} from "react-native";
import React,{useState,useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, onValue,set } from 'firebase/database';

// const firebaseConfig = {
//     apiKey: "AIzaSyAuXO5496YbOF_Tud0_nTa0elGhykW99jI",
//     authDomain: "pointofsaleapp-437a3.firebaseapp.com",
//     databaseURL: "https://pointofsaleapp-437a3-default-rtdb.firebaseio.com",
//     projectId: "pointofsaleapp-437a3",
//     storageBucket: "pointofsaleapp-437a3.appspot.com",
//     messagingSenderId: "482869522806",
//     appId: "1:482869522806:web:37dbc06ade4395df808a57",
//     measurementId: "G-5W0DP1EQBT"
//   };
//   initializeApp(firebaseConfig);



const AddReview = ({route,navigation}) => {
    const myEmail=route.params.myEmail; 
    const ShopId=route.params.ShopId; 
    const [reviewText,setreviewText] = useState("");
  
   
    const submit= () =>{
        var fetchInsertApi="https://cucina.com.pk/api/user/add_review.php";
        var headers={
            'Accept':'application/json',
            'Content-Type':'application.json'
        };

        var Data={
            review_text:reviewText,
            seller_id:ShopId,
            s_email:myEmail
        };
        fetch(fetchInsertApi,
            {
               method:'POST',
               headers:headers,
               body:JSON.stringify(Data), 
            }).then((response) => response.json())
            .then((response) =>
             {
                 if(response[0].Message == "Review Added")
                 {
                    // const db = getDatabase();
                    // const reference = ref(db, 'Reviews/' + response[0].reviewid);
                    // set(reference, {
                    //     UserEmail: myEmail,
                    //     ShopId: ShopId,
                    //     ReviewText: reviewText,
                        
                       
                        
                    // });
             
                    navigation.navigate("ReviewList",{myEmail : myEmail,ShopId:ShopId});
                 }
                 else{
                  alert('Review Not Added Please Try Again');
                 }
             }
            ).catch((error) =>
            {
                alert("Error"+error);
            });

    };



  
 
     return (
        <ScrollView
      
        >
        <View style={styles.mainscreen}>
           
            <View>
            <Text style={styles.mainhaider}>Add Review</Text>
            </View>

      
            <View style={{marginTop:20}}>
             <Text style={styles.labels}>Review Text</Text>
             <TextInput 
              style={styles.textinput}
              autoCapitalize="none"
              selectionColor="#800080"
              autoCorrect={false}
              value={reviewText}
              onChangeText={(actualdata) => setreviewText(actualdata)}
             />
         </View>
       


       
       
   
         <TouchableOpacity style={[styles.touchopacity,
          {
             backgroundColor:"#800080",
          },
       ]}
        onPress={() => submit()}
       >
           <Text style={styles.buttonstyle}>Add Review</Text>
   
         </TouchableOpacity>
             
   
        </View>

        </ScrollView>
   
   
      );    
 };
 
 
 
 const styles = StyleSheet.create({
         
    mainscreen:{
   
        padding:20,
        marginTop:15,

 
     },
     imagestyle:{
      flexDirection: 'row', justifyContent: 'space-between'
     },
     container: {
       flex: 1,
       backgroundColor: '#fff',
       alignItems: 'center',
       justifyContent: 'center',
     },
     mainhaider:{
         fontSize:20,
         marginTop:10,
         fontWeight:"bold",
         color:"#800080",
         textAlign:"center"
 
     },
     description:{
         color:"grey",
         marginTop:4,
     },
     labels:{
         color:"grey",
         marginTop:15,
         fontWeight:"bold"
     },
     textinput:{
         borderWidth:1,
         borderColor:"grey",
         paddingHorizontal:15,
         paddingVertical:7,
         borderRadius:1,
         fontSize:18,
     },
     checkboxstyle:{
         marginTop:15,
 
     },
     checkboxtext:{
         marginLeft:30,
         marginTop:-20,
     },
     buttonstyle:{
         textAlign:"center",
         padding:8,
         color:"white",
     },
     buttonstyle2:{
        textAlign:"center",
        padding:8,
        color:"white",
        marginTop:8
    },
     touchopacity:{
         marginTop:15,
     },
     registerbutton:{
       color:"#800080",
     
     },
     registerbutton2:{
      marginTop:8,
    },
    touchreg:{
       marginTop:25
    },
     
   });
 
 
 export default AddReview;