import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image,FlatList} from "react-native";
import React,{useState,useEffect} from "react";
import {Picker} from "@react-native-picker/picker";

const ProductDetail = ({route,navigation})=>{
    const ProductId=route.params.ProductId; 
    const myEmail=route.params.myEmail;
    const [cartqty,setcartqty] = useState("0");
    const [shoptype,setshoptype] = useState("");
    const [productprice,setproductprice] = useState("");

    const [productdata,setproductdata] = useState("");
  var fetchInsertApi="https://cucina.com.pk/api/user/fetch_product_detail.php?productid="+ProductId;
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

        const submit= () =>{
          if(cartqty !=0)
          {
          if(shoptype == "Online")
          {
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
              shop_type:shoptype,
              pick_date:"",
              pick_time:"",
            
            };
            fetch(fetchInsertApi,
                {
                   method:'POST',
                   headers:headers,
                   body:JSON.stringify(Data), 
                }).then((response) => response.json())
                .then((response) =>
                 {
                     if(response[0].Message == "Cart Successfully")
                     {
                  
                        navigation.navigate("Cart",{myEmail : `${myEmail}`});
                     }
                     else if(response[0].Message == "Stock Not Available")
                     {
                  
                      alert('Stock Not Available');
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

          }
          else{
            if(shoptype == "Both")
            {
            navigation.navigate("AddCarts",{myEmail : `${myEmail}`,ProductId : ProductId,shoptype:shoptype,cartqty:cartqty,productprice:productprice}); 
            }
           else if(shoptype == "Physical")
            {
            navigation.navigate("AddCarts2",{myEmail : `${myEmail}`,ProductId : ProductId,shoptype:shoptype,cartqty:cartqty,productprice:productprice}); 
            }
          }
        }
        else{
          alert("Minimum Qty is 1 ");
        }
         
  
  
      };    

  
    return(

       <View style={{flex:1,backgroundColor:'white'}}>
           
      


           <FlatList 
              keyExtractor={(key) =>{
         return key.product_id;
             }}
       
     data={productdata}
     showsHorizontalScrollIndicator={false}
     renderItem={(element)=>{
      setshoptype(element.item.shop_type);
      setproductprice(element.item.product_price);
         return (
        

           

          
        
          
          <View style={{justifyContent: 'center',borderBottomColor:'black'}}>
           <Image style={styles.imagestyle}  source={{uri:"https://cucina.com.pk/api/"+element.item.product_image}} />
           <Text style={{marginTop:10,fontSize:25}}> {element.item.product_name}</Text>
           <Text style={{fontSize:20,fontWeight:'bold'}}> Rs : {element.item.product_price}</Text>
           <Text style={{color:'black',marginStart:5,fontWeight:'bold'}}>Shop Type : {element.item.shop_type}</Text>
           <Text style={{color:'black',marginStart:5,fontWeight:'bold'}}>Minimum Order Time : {element.item.order_time} Minutes</Text>
          
           <Text style={{color:'black',marginStart:5,fontWeight:'bold'}}>Description :  <Text style={{fontWeight:'normal'}}>{element.item.product_desc} </Text></Text>
           <View
             style={{
               borderBottomColor: '#800080',
               borderBottomWidth: 1,
               marginTop:4
             }}
           />


<View style={styles.container}>
<View style={styles.item3}></View>
<View style={styles.item1}>
          <TextInput 
              style={styles.textinput}
              autoCapitalize="none"
              autoCorrect={false}
              selectionColor="#800080"
              keyboardType='numeric'
              value={cartqty}
              onChangeText={(actualdata) => setcartqty(actualdata)}
             />
           
          </View>
          <View style={styles.item4}></View>
          <View style={styles.item2}>
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
        
        
        
          </View>
         
          </View>


  
          
          
          
   


         );
     }}
     />

     



         

       </View>


    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      marginTop:20 ,
      justifyContent: 'center',alignItems: 'center'// if you want to fill rows left to right
    },
    item: {
      width: '50%',
      backgroundColor:"black",
      

       // is 50% of container width
    },
    item1: {
        width: '25%' // is 50% of container width
      },
    item2: {
        width: '60%', // is 50% of container width
        marginTop:22
      },
      item3: {
        width: '10%', // is 50% of container width
        
      },
      item4: {
        width: '5%', // is 50% of container width
        
      },

      imagestyle:{
          marginTop:10,
          height:300,
          width:350,
          alignSelf: 'center',
      },
      buttonstyle:{
        textAlign:"center",
        padding:8,
        color:"white",
    },
    textinput:{
      borderWidth:1,
      borderColor:"grey",
      paddingHorizontal:15,
      paddingVertical:7,
      borderRadius:1,
      fontSize:18,
  },
  });
export default ProductDetail;