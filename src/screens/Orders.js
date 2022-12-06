import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image,FlatList} from "react-native";
import React,{useState,useEffect} from "react";


const Orders = ({route,navigation})=>{

    const myEmail=route.params.myEmail; 
  const [productdata,setproductdata] = useState("");
  var fetchInsertApi="https://cucina.com.pk/api/user/fetch_order.php?semail="+myEmail;
      var headers={
          'Accept':'application/json',
          'Content-Type':'application.json'
      };

      if(productdata=="")
      {
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
      <Text style={{marginTop:10,fontSize:20,color:"#800080",alignContent:'center',justifyContent:'center',textAlign:'center'}}>My Order</Text>
       
      </View>
   
      
             <FlatList 
              keyExtractor={(key) =>{
         return key.product_id;
             }}
             showsHorizontalScrollIndicator={false}
      style={{padding:10}} 
     data={productdata}
     renderItem={(element)=>{
         return (
          <View style={styles.container}> 
        
         
          
          <View style={styles.item1}>
           <Image style={styles.imagestyle}  source={{uri:"https://cucina.com.pk/api/orders.png"}} />
           
          </View>
          
          <View style={styles.item2}>
          <TouchableOpacity
          onPress={() => navigation.navigate("OrderDetail",{order_id :element.item.order_id,total_bill :element.item.total_bill,payment_type :element.item.payment_type,order_status :element.item.order_status,order_note :element.item.order_note,myEmail:myEmail})}>
           <Text> Total Bill  : Rs {element.item.total_bill}</Text>
           <Text> Payment Type  : {element.item.payment_type}</Text>
           <Text> Order Status  : {element.item.order_status}</Text>
           <Text> Order Date  : {element.item.order_date}</Text>
           
           </TouchableOpacity>
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
      backgroundColor:'white',
      marginTop:5,
      paddingBottom:5,
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
        width: '74%', // is 50% of container width
        marginTop:15,
        marginStart:5

      },
      item5: {
        width: '15%', // is 50% of container width
        marginTop:22
      },
      item3: {
        width: '65%', // is 50% of container width
        
      },
      item4: {
        width: '35%', // is 50% of container width
        
      },

      imagestyle:{
          marginTop:20,
          marginStart:10,
          height:80,
          width:70
      },
      imagestyle2:{
        marginTop:20,
        marginStart:10,
        height:30,
        width:30
    },
    
  });

export default Orders;