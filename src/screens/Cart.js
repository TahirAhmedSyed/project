import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image,FlatList} from "react-native";
import React,{useState,useEffect} from "react";


const Cart = ({route,navigation})=>{

    const myEmail=route.params.myEmail; 
  const [productdata,setproductdata] = useState("");
  var fetchInsertApi="https://cucina.com.pk/api/user/getcard_detail.php?semail="+myEmail;
      var headers={
          'Accept':'application/json',
          'Content-Type':'application.json'
      };

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
        

    return (
      <View > 
        <View >
      <Text style={{marginTop:10,fontSize:20,color:"#800080",alignContent:'center',justifyContent:'center',textAlign:'center'}}>My Cart</Text>
       
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
           <Image style={styles.imagestyle}  source={{uri:"https://cucina.com.pk/api/"+element.item.product_image}} />
           
          </View>
          
          <View style={styles.item2}>
           <Text> Product Name  : {element.item.product_name}</Text>
           <Text> Price  : {element.item.pro_price}</Text>
           <Text> Qty  : {element.item.p_qty}</Text>
           <Text> Order Type  : {element.item.shop_type}</Text>
           
          
           <View
             style={{
               borderBottomColor: '#800080',
               borderBottomWidth: 2,
               
             }}
           />
          </View>
          <View style={styles.item5}>
              <TouchableOpacity
              onPress={() => navigation.navigate("RemoveCart",{cart_id : element.item.cart_id,myEmail:myEmail})} >
          <Image style={styles.imagestyle2}  source={{uri:"https://cdn-icons-png.flaticon.com/512/458/458594.png"}} />
          </TouchableOpacity>
          </View>
          
          
          </View>


         );
     }}
     />
         <TouchableOpacity style={{backgroundColor:"#800080",marginTop:15,marginStart:10,marginEnd:10}} 
          onPress={() => navigation.navigate("Checkouts",{myEmail:myEmail})}
         >
             <Text style={{color:"white",textAlign:"center",padding:10}}>Check Out</Text>
         </TouchableOpacity>
      

       
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
        width: '60%', // is 50% of container width
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

export default Cart;