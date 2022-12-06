import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image,FlatList} from "react-native";
import React,{useState,useEffect} from "react";


const OrderDetail = ({route,navigation})=>{

    const myEmail=route.params.myEmail; 
    const order_id=route.params.order_id; 
    const total_bill=route.params.total_bill; 
    const payment_type=route.params.payment_type; 
    const order_status=route.params.order_status; 
    const order_note=route.params.order_note; 
    const [productdata,setproductdata] = useState("");
    const [qrcode,setqrcode] = useState("");
    var fetchInsertApi="https://cucina.com.pk/api/user/fetch_order_detail.php?oid="+order_id;
    var fetchInsertApi2="https://cucina.com.pk/api/user/generate_qrcode.php?oid="+order_id;
        var headers={
            'Accept':'application/json',
            'Content-Type':'application.json'
        };
  
        if(productdata == "")
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
        
            fetch(fetchInsertApi2,
                {
                   method:'GET',
                   headers:headers,
                }).then((response) => response.json())
                .then((response) =>
                 {
                     setqrcode(response[0].Message);
                 }
                ).catch((error) =>
                {
                    console.log(error);
                    alert("Error"+error);
                });
        
          
  
      return (
        <View > 
          <View >
        <Text style={{marginTop:10,fontSize:20,color:"#800080",alignContent:'center',justifyContent:'center',textAlign:'center'}}>Order Detail</Text>

        <Text style={{marginTop:5,fontSize:16,color:"black",alignContent:'center',justifyContent:'center',textAlign:'center'}}>Order No : ORD-{order_id}</Text>
        <Text style={{marginTop:5,fontSize:16,color:"black",alignContent:'center',justifyContent:'center',textAlign:'center'}}>Total Bill : ORD-{total_bill}</Text>
        <Text style={{marginTop:5,fontSize:16,color:"black",alignContent:'center',justifyContent:'center',textAlign:'center'}}>Order Note : ORD-{order_note}</Text>
         
        </View>
     
        
               <FlatList 
                keyExtractor={(key) =>{
           return key.product_id;
               }}
               showsHorizontalScrollIndicator={false}
        style={{padding:10,maxHeight:400}} 
       data={productdata}
       renderItem={(element)=>{
           return (
            <View style={styles.container}> 
          
            
            
            <View style={styles.item1}>
             <Image style={styles.imagestyle}  source={{uri:"https://cucina.com.pk/api/"+element.item.product_image}} />
             
            </View>
            
            <View style={styles.item2}>
             <Text> Product Name  : {element.item.product_name}</Text>
             <Text> Price  : {element.item.product_price}</Text>
             <Text> Qty  : {element.item.ord_qty}</Text>
             <Text> Shop Name  : {element.item.shop_name}</Text>
             <Text> Order Type  : {element.item.ordertype}</Text>
             
            
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

<View style={{alignContent:'center',alignItems:'center'}}>
    <Image style={styles.imagestyle3}  source={{uri:"https://cucina.com.pk/api/user/"+qrcode}} />
    </View>      

          
        
  
         
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
        width: '70%', // is 50% of container width
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
    imagestyle3:{
        marginTop:20,
        marginStart:10,
        height:120,
        width:120,
        alignItems:'center',
        alignContent:'center'
    },
    
  });

export default OrderDetail;