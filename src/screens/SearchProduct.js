import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image,FlatList} from "react-native";
import React,{useState} from "react";


const SearchProduct = ({route,navigation})=>{
    const searhKeyword=route.params.searhKeyword; 
    const myEmail=route.params.myEmail;
    const [productdata,setproductdata] = useState("");
    var fetchInsertApi="https://cucina.com.pk/api/user/fetch_search_product.php?ukeyword="+searhKeyword;
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
  

    return(
        <View > 
             <FlatList 
              keyExtractor={(key) =>{
         return key.product_id;
             }}
             
     style={{backgroundColor:'#F8F8F8'}}
     data={productdata}
     numColumns={2}
     renderItem={(element)=>{
         return (
          <View style={styles.container}> 
        
        <TouchableOpacity 
           onPress={() => navigation.navigate("ProductDetail",{ProductId : element.item.product_id,myEmail:myEmail})}>
          <View style={{justifyContent: 'center',borderBottomColor:'black'}}>
           <Image style={styles.imagestyle}  source={{uri:"https://cucina.com.pk/api/"+element.item.product_image}} />
           <Text style={{marginTop:10,textAlign:'center'}}> {element.item.product_name}</Text>
           <Text style={{textAlign:'center'}}> Rs : {element.item.product_price}</Text>
           <View
             style={{
               borderBottomColor: '#800080',
               borderBottomWidth: 1,
               marginTop:4
             }}
           />
          </View>
          </TouchableOpacity>
          
          
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
      marginTop:8 ,
      backgroundColor:'white',
      margin:5,
      justifyContent: 'center',alignItems: 'center'// if you want to fill rows left to right
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
          height:100,
          width:100,
          alignSelf: 'center',
      },
    
  });
export default SearchProduct;