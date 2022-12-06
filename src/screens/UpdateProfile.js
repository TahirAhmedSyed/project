import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image,ScrollView} from "react-native";
import React,{useState,useEffect} from "react";
import Checkbox from "expo-checkbox";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Picker} from "@react-native-picker/picker";

const UpdateProfile = ({route,navigation}) => {
    const [agree,setagree]=useState(false);
    const [userName,setuserName] = useState("");
    const [userEmail,setuserEmail] = useState("");
    const [password,setpassword] = useState("");
    const [phoneNo,setphoneNo] = useState("");
   
    const myEmail=route.params.myEmail;
    const getUserDate = async () =>{
        if(userName == "")
        {
        try {
            const response = await fetch("https://cucina.com.pk/api/user/getUserDetail.php?semail="+myEmail);
            const MyData=await response.json();
            // setmyUserData(MyData);
            if(userName
                 == "")
            {
            setuserName(MyData[0].user_name);

            setpassword(MyData[0].user_pass);
            setphoneNo(MyData[0].user_phone);
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
        var fetchInsertApi="https://cucina.com.pk/api/user/update_user.php";
        var headers={
            'Accept':'application/json',
            'Content-Type':'application.json'
        };

        var Data={
            s_name:userName,
            s_email:myEmail,
            s_password:password,
            
            phone_no:phoneNo,
        };
        fetch(fetchInsertApi,
            {
               method:'POST',
               headers:headers,
               body:JSON.stringify(Data), 
            }).then((response) => response.json())
            .then((response) =>
             {
                 if(response[0].Message == "Update")
                 {
                    navigation.navigate("Home",{myEmail : `${myEmail}`});
                 }
                 else{
                  alert('Update UnSuccessfully');
                 }
             }
            ).catch((error) =>
            {
                alert("Error"+error);
            });


    };
   
      return(
        <ScrollView
      
        >
        <View style={styles.mainscreen}>
           
            <View>
            <Text style={styles.mainhaider}>Update Profile</Text>
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
             <Text style={styles.labels}>Enter Your Password</Text>
             <TextInput 
              style={styles.textinput}
              autoCapitalize="none"
              selectionColor="#800080"
              autoCorrect={false}
              
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


       
       
   
         <TouchableOpacity style={[styles.touchopacity,
          {
             backgroundColor:"#800080",
          },
       ]}
        onPress={() => submit()}
       >
           <Text style={styles.buttonstyle}>Update Profile</Text>
   
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
   
   
   export default UpdateProfile;