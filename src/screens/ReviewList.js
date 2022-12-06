import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image,FlatList} from "react-native";
import React,{useState,useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const ReviewList = ({route,navigation}) => {
  const myEmail=route.params.myEmail;
  const ShopId=route.params.ShopId; 
  const [productdata,setproductdata] = useState("");
  var fetchInsertApi="https://cucina.com.pk/api/user/fetch_review.php?ushop="+ShopId;
      var headers={
          'Accept':'application/json',
          'Content-Type':'application.json'
      };

      if(productdata == ""){
      fetch(fetchInsertApi,
          {
             method:'GET',
             headers:headers, 
          }).then((response) => response.json())
          .then((response) =>
           {
               console.log(response);
               setproductdata(response);
           
           }
          ).catch((error) =>
          {
              alert("Error"+error);
          });
        }


    return (
      <View > 
        <View >
      <Text style={{marginTop:10,fontSize:20,color:"#800080",alignContent:'center',justifyContent:'center',textAlign:'center'}}>Review List</Text>
       
      </View>
      <View >
      
         <TouchableOpacity style={{backgroundColor:"#800080",marginTop:15}} 
          onPress={() => navigation.navigate("AddReview",{myEmail : `${myEmail}`,ShopId : `${ShopId}`})}>
             <Text style={{color:"white",textAlign:"center",padding:10}}>+ Add Review</Text>
         </TouchableOpacity>
      
       
      </View>
      
             <FlatList 
              keyExtractor={(key) =>{
         return key.product_id;
             }}
             showsHorizontalScrollIndicator={false}
       
     data={productdata}
     renderItem={(element)=>{
         return (
          <View style={styles.container}> 
        
          
          
          <View style={styles.item1}>
           <Image style={styles.imagestyle}  source={{uri:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}} />
           
          </View>
          
          <View style={styles.item2}>
           <Text> User Name  : {element.item.user_name}</Text>
           <Text> Review   : {element.item.review_text}</Text>
           
          
           <View
             style={{
               borderBottomColor: '#800080',
               borderBottomWidth: 2,
             }}
           />
          </View>
          
          
          </View>


         );
     }}
     />
       

       
</View>


        
     );    
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item: {
      width: '50%' // is 50% of container width
    },
    item1: {
        width: '23%' // is 50% of container width
      },
    item2: {
        width: '77%', // is 50% of container width
        marginTop:22
      },
      item3: {
        width: '65%', // is 50% of container width
        
      },
      item4: {
        width: '35%', // is 50% of container width
        
      },

      imagestyle:{
          marginTop:10,
          marginStart:10,
          height:70,
          width:70
      },
    
  });


export default ReviewList;