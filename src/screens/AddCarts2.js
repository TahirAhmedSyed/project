import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image,ScrollView, Platform,Button} from "react-native";
import React,{useState} from "react";
import Checkbox from "expo-checkbox";
import RNDateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import {Picker} from "@react-native-picker/picker";


const AddCarts2 = ({route,navigation})=>{
    const myEmail=route.params.myEmail; 
    const ProductId=route.params.ProductId; 
    const shoptype=route.params.shoptype; 
    const cartqty=route.params.cartqty; 
    const productprice=route.params.productprice; 

    const [oshoptype,setoshoptype] = useState("Physical");
    const [pickdate,setpickdate] = useState("");
    const [picktime,setpicktime] = useState("");

    const [date,setDate] = useState(new Date());
    const [mode,setMode] = useState('date');
    const [show,setShow] = useState(false);
    const [datetext,setdatetext] = useState('Empty');
    const [timetext,settimetext] = useState('Empty');
    const [minutetext,setminutetext] = useState('Empty');
    const [hourtext,sethourtext] = useState('Empty');
    const [totaltime,settotaltime] = useState('Empty');

    const onChange= (event,selectedDate) =>{
        const currentDate =selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate=new Date(currentDate);
        let fDate=tempDate.getDate() + "/"+ (tempDate.getMonth() + 1) +"/"+tempDate.getFullYear();
        let fTime='Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
        setdatetext(fDate);
        settimetext(fTime);
        setminutetext(tempDate.getMinutes());
        sethourtext(tempDate.getHours());
        let fTotal=tempDate.getFullYear()+'-'+(tempDate.getMonth() + 1)+"-"+tempDate.getDate()+" "+ tempDate.getHours() +":"+tempDate.getMinutes()+":"+tempDate.getSeconds();
        settotaltime(fTotal);

    }

    const showMode = (currentMode) =>{
        setShow(true);
        setMode(currentMode);
    }

    const submit= () =>{
       
          var fetchInsertApi="https://cucina.com.pk/api/user/add_cart.php";
          var headers={
              'Accept':'application/json',
              'Content-Type':'application.json'
          };
  
          var Data={
            user_email:myEmail,
            pro_id:ProductId,
            pro_price:productprice,
            p_qty:cartqty,
            shop_type:oshoptype,
            pick_date:datetext,
            pick_time:timetext,
            totaltime:totaltime
          
          };
          fetch(fetchInsertApi,
              {
                 method:'POST',
                 headers:headers,
                 body:JSON.stringify(Data), 
              }).then((response) => response.json())
              .then((response) =>
               {
                alert(response[0].Message);
                   if(response[0].Message == "Cart Successfully")
                   {
                      
                      navigation.navigate("Cart",{myEmail : `${myEmail}`});
                   }
                  else if(response[0].Message == "Stock Not Available")
                   {
                
                    alert('Stock Not Available');
                   }
                   else if(response[0].Message == "Time Not suit")
                   {
                
                    alert('Please check the Minimum time limit and try again');
                   }
                   
                   else if(response[0].Message == "Cart Not Successfully"){
                    alert('Cart Not Successfully Please Try Again');
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
            <Text style={styles.mainhaider}>Add To Cart</Text>
            </View>

            <View>
             <Text style={styles.labels}>Select Order Type</Text>
             <Picker
        selectedValue={oshoptype}
        style={styles.textinput}
        onValueChange={(itemValue, itemIndex) => setoshoptype(itemValue)}
      >
          
        <Picker.Item label="Physical" value="Physical" />
        
      </Picker>
            
         </View>

      
            <View>
             <Text style={styles.labels}>Select Date (if Order Type Physical)</Text>
             <Text style={styles.labels}>{datetext}</Text>
             <Button title="DatePicker" style={{backgroundColor:"#800080",color:'white',padding:'5dp'}} onPress={()=> showMode('date')} />
            
         </View>

         <View>
             <Text style={styles.labels}>Select Time (if Order Type Physical)</Text>
             <Text style={styles.labels}>{timetext}</Text>
             <Button title="TimePicker" style={{backgroundColor:"#800080",color:'white',padding:'5dp'}} onPress={()=> showMode('time')} />
            
         </View>
        

        
         {show &&(
               <RNDateTimePicker
               testID="dateTimePicker"
               value={date}
               mode={mode}
               minimumDate={new Date()}
               is24Hour={true}
               display='default'
               style={{backgroundColor:'#800080'}}
               onChange={onChange}
               />
           )}

         
       
       
        
   
         <TouchableOpacity style={[styles.touchopacity,
          {
             backgroundColor:"#800080",
          },
       ]}
        onPress={() => submit()}
       >
           <Text style={styles.buttonstyle}>Add To Cart</Text>
   
         </TouchableOpacity>
             
   
        </View>

        </ScrollView>
    );
}
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
   
   
export default AddCarts2;