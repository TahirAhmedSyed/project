import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image} from "react-native";
import React,{useState,useEffect} from "react";
import Checkbox from "expo-checkbox";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Picker} from "@react-native-picker/picker";

const Payment = ({route,navigation}) => {

    const myEmail=route.params.myEmail; 
    const [cardno,setcardno] = useState("");
    const [cvccode,setcvccode] = useState("");
    const [expiredate,setexpiredate] = useState("");
    
   
   
    const submit= () =>{
        
        navigation.navigate("Home",{myEmail : `${myEmail}`});
        alert("Payment Done Successfully");
    };
   
      return(
        <View style={styles.mainscreen}>
           
            <View>
            <Text style={styles.mainhaider}>Payment Now</Text>
            <Text style={styles.description}>Pay Your Bill via Online Payment</Text>
            </View>

      
         <View>
             <Text style={styles.labels}>Enter Your Card No </Text>
             <TextInput 
              style={styles.textinput}
              autoCapitalize="none"
              autoCorrect={false}
              selectionColor="#800080"
              value={cardno}
              onChangeText={(actualdata) => setcardno(actualdata)}
             />
         </View>
         <View>
             <Text style={styles.labels}>Enter CVC Code</Text>
             <TextInput 
              style={styles.textinput}
              autoCapitalize="none"
              autoCorrect={false}
              selectionColor="#800080"
              value={cvccode}
              onChangeText={(actualdata) => setcvccode(actualdata)}
             />
         </View>
         <View>
             <Text style={styles.labels}>Enter Expiry</Text>
             <TextInput 
              style={styles.textinput}
              autoCapitalize="none"
              autoCorrect={false}
              selectionColor="#800080"
              placeholder="MM/YY"
              value={expiredate}
              onChangeText={(actualdata) => setexpiredate(actualdata)}
             />
         </View>
         
   
   
         <TouchableOpacity style={[styles.touchopacity,
          {
             backgroundColor: "#800080",
          },
       ]}
        onPress={() => submit()}
       >
           <Text style={styles.buttonstyle}>Payment Now</Text>
   
         </TouchableOpacity>
             
   
        </View>
   
   
      );
   
   };
   const styles = StyleSheet.create({
       
      
    mainscreen:{
   
          padding:20,
          marginTop:25,

   
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
           textAlign:'center',
           alignContent:'center',
           color:"#800080",
   
       },
       description:{
           color:"grey",
           marginTop:4,
           textAlign:'center',
           alignContent:'center',
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
   
   export default Payment;