import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image} from "react-native";
import React,{useState,useEffect} from "react";
import Checkbox from "expo-checkbox";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Picker} from "@react-native-picker/picker";

const Checkouts = ({route,navigation}) => {
    const [agree,setagree]=useState(false);
    const myEmail=route.params.myEmail; 
    const [totalprice,settotalprice] = useState("");
    const [caddress,setcaddress] = useState("");
    const [ordernote,setordernote] = useState("");
    const [paymenttype,setpaymenttype] = useState("Cash On Delivery");
    const getUserDate = async () =>{
    if(totalprice == "")
    {
    try {
        const response = await fetch("https://cucina.com.pk/api/user/gettotal_price.php?semail="+myEmail);
        const MyData=await response.json();
        // setmyUserData(MyData);
        if(totalprice
             == "")
        {
            settotalprice(MyData[0].totalprice);

       
          }
         console.log(MyData);

    } catch (error) {
        console.log(error);
    }
   }
};
    
useEffect( () => {
  getUserDate();
}),[];
   
   
    const submit= () =>{
        
        var fetchInsertApi="https://cucina.com.pk/api/user/place_order.php";
        var headers={
            'Accept':'application/json',
            'Content-Type':'application.json'
        };

        var Data={
            totalprice:totalprice,
            caddress:caddress,
            ordernote:ordernote,
            paymenttype:paymenttype,
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
                 if(response[0].Message == "Order Place")
                 {
                     if(paymenttype == "Cash On Delivery")
                     {
                        navigation.navigate("MainScreen",{myEmail : `${myEmail}`});
                        alert("Order Place Successfully");

                     }
                     else{
                        navigation.navigate("Payment",{myEmail : `${myEmail}`});

                     }
                    
                    
                 }
                 else{
                  alert('Order Not Place Successfully Please Try Again');
                 }
             }
            ).catch((error) =>
            {
                alert("Error"+error);
            });
    };
   
      return(
        <View style={styles.mainscreen}>
           
            <View>
            <Text style={styles.mainhaider}>Order Now</Text>
            <Text style={styles.description}>Your Total Bill Is Rs : {totalprice}</Text>
            </View>

      
         <View>
             <Text style={styles.labels}>Enter Your Address (If Online Order)</Text>
             <TextInput 
              style={styles.textinput}
              autoCapitalize="none"
              autoCorrect={false}
              selectionColor="#800080"
              value={caddress}
              onChangeText={(actualdata) => setcaddress(actualdata)}
             />
         </View>
         <View>
             <Text style={styles.labels}>Order Note (Optional)</Text>
             <TextInput 
              style={styles.textinput}
              autoCapitalize="none"
              autoCorrect={false}
              selectionColor="#800080"
              value={ordernote}
              onChangeText={(actualdata) => setordernote(actualdata)}
             />
         </View>
         <View>
             <Text style={styles.labels}>Select Payment Type</Text>
             <Picker
        selectedValue={paymenttype}
        style={styles.textinput}
        onValueChange={(itemValue, itemIndex) => setpaymenttype(itemValue)}
      >
        <Picker.Item label="Cash On Delivery" value="Cash On Delivery" />
        
        <Picker.Item label="Online Payment" value="Online Payment" />
        
      </Picker>
            
         </View>
   
   
         <TouchableOpacity style={[styles.touchopacity,
          {
             backgroundColor: "#800080",
          },
       ]}
      
        onPress={() => submit()}
       >
           <Text style={styles.buttonstyle}>Place Order</Text>
   
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
   
   export default Checkouts;