import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image,ScrollView} from "react-native";
import React,{useState} from "react";
import Checkbox from "expo-checkbox";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Picker} from "@react-native-picker/picker";

const Register = ({navigation}) => {
    const [agree,setagree]=useState(false);
    const [userName,setuserName] = useState("");
    const [userEmail,setuserEmail] = useState("");
    const [password,setpassword] = useState("");
    const [phoneNo,setphoneNo] = useState("");
   
    const submit= () =>{
        var fetchInsertApi="https://cucina.com.pk/api/user/user_register.php";
        var headers={
            'Accept':'application/json',
            'Content-Type':'application.json'
        };

        var Data={
            s_name:userName,
            s_email:userEmail,
            s_password:password,
            
            phone_no:phoneNo
        };
        fetch(fetchInsertApi,
            {
               method:'POST',
               headers:headers,
               body:JSON.stringify(Data), 
            }).then((response) => response.json())
            .then((response) =>
             {
                 if(response[0].Message == "User has been Register")
                 {
              
                    navigation.navigate("EmailVerifcation",{myEmail : `${userEmail}`});
                 }
                 else{
                  alert('User Has Not Been Register Please Try Again');
                 }
             }
            ).catch((error) =>
            {
                console.log(error);
                alert("Error"+error);
            });


    };
   
      return(
        <ScrollView
      
        >
        <View style={styles.mainscreen}>
            <View>
             <Image style={styles.imagestyle}
              source={require("../../assets/poslogos.png")}
             />
             </View>
            <View>
            <Text style={styles.mainhaider}>User Register</Text>
            </View>

      
            <View>
             <Text style={styles.labels}>Enter Your Name</Text>
             <TextInput 
              style={styles.textinput}
              autoCapitalize="none"
              autoCorrect={false}
              selectionColor="#800080"
              value={userName}
              onChangeText={(actualdata) => setuserName(actualdata)}
             />
         </View>
     

         <View>
             <Text style={styles.labels}>Enter Your Email</Text>
             <TextInput 
              style={styles.textinput}
              autoCapitalize="none"
              selectionColor="#800080"
              autoCorrect={false}
              value={userEmail}
              onChangeText={(actualdata) => setuserEmail(actualdata)}
             />
         </View>
   
         <View>
             <Text style={styles.labels}>Enter Your Password</Text>
             <TextInput 
              style={styles.textinput}
              autoCapitalize="none"
              selectionColor="#800080"
              autoCorrect={false}
              secureTextEntry={true}
              value={password}
              onChangeText={(actualdata) => setpassword(actualdata)}
             />
         </View>
         <View>
             <Text style={styles.labels}>Enter Phone No</Text>
             <TextInput 
              style={styles.textinput}
              autoCapitalize="none"
              selectionColor="#800080"
              autoCorrect={false}
              value={phoneNo}
              onChangeText={(actualdata) => setphoneNo(actualdata)}
             />
         </View>
         
           

        


         <View>
             <Text style={styles.registerbutton2}>Already Have An Account ?
             <TouchableOpacity style={styles.touchreg}
             onPress={() => navigation.navigate("Login")}
             ><Text style={styles.registerbutton}> Login Now</Text>
             </TouchableOpacity> 
             </Text>
         </View>
       
       
         <View  style={styles.checkboxstyle}>
             <Checkbox 
            
              value={agree}
              onValueChange={() => setagree(!agree)}
              color={agree ? "#800080" : undefined}
             />
             <Text  style={styles.checkboxtext}>I have Read and agreed all Policy</Text>
         </View>
   
         <TouchableOpacity style={[styles.touchopacity,
          {
             backgroundColor:agree ? "#800080" : "grey",
          },
       ]}
        disabled={! agree}
        onPress={() => submit()}
       >
           <Text style={styles.buttonstyle}>Register</Text>
   
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
   
   
   export default Register;