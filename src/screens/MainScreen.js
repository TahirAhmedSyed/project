import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image,ScrollView,FlatList} from "react-native";
import React,{useState,useEffect} from "react";
import { Avatar, Button, Card, Title, Paragraph,Searchbar  } from 'react-native-paper';
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />



const MainScreen = ({route,navigation})=>{
  const myEmail=route.params.myEmail;
     
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => {
        setSearchQuery(query)
    
    };
    const [shopdata,setShopdata] = useState("");
    const [productdata,setproductdata] = useState("");
   
    var fetchInsertApi="https://cucina.com.pk/api/user/fetch_seller.php";
    var fetchInsertApi2="https://cucina.com.pk/api/user/fetch_home_product.php";
        var headers={
            'Accept':'application/json',
            'Content-Type':'application.json'
        };
  
        const getUserDate = async () =>{
          if(productdata =="")
          {
        fetch(fetchInsertApi,
            {
               method:'GET',
               headers:headers, 
            }).then((response) => response.json())
            .then((response) =>
             {
                 console.log(response);
                 setShopdata(response);
             
             }
            ).catch((error) =>
            {
                alert("Error"+error);
            });


            fetch(fetchInsertApi2,
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

          };

          useEffect( () => {
            getUserDate();
            return () => {

          }
          }),[];
            
    return(
        <ScrollView
      
        >
        <View style={styles.container}> 
        
         <View style={styles.item1}>
             <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={{marginTop:32}}

    />
    </View>
    <View style={styles.item}>
        <TouchableOpacity 
        onPress={()=> navigation.navigate("SearchProduct",{searhKeyword : searchQuery,myEmail:myEmail})}
        style={{marginTop:23}}>
           
        <Image style={styles.imagestyle}  source={{uri:"https://cdn-icons-png.flaticon.com/512/672/672933.png"}} />
        </TouchableOpacity>
    </View>

    
   
    <View style={styles.item2}>

    <FlatList 
              keyExtractor={(key) =>{
         return key.product_id;
             }}
             
     style={{backgroundColor:'#F8F8F8'}}  
     data={productdata}
     numColumns={2}
     renderItem={(element)=>{
         return (
          <View style={styles.container2}> 
        
        <TouchableOpacity 
        style={{backgroundColor:'white'}}
           onPress={() => navigation.navigate("ProductDetail",{ProductId : element.item.product_id,myEmail:myEmail})}>
          <View style={{justifyContent: 'center',borderBottomColor:'black'}}>
           <Image style={styles.imagestyle2}  source={{uri:"https://cucina.com.pk/api/"+element.item.product_image}} />
           <Text style={{marginTop:10,textAlign:'center'}}> {element.item.product_name}</Text>
           
           <Text style={{textAlign:'center'}}> Rs : {element.item.product_price}</Text>
           <Text style={{textAlign:'center'}}>By {element.item.shop_name}</Text>
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

<TouchableOpacity style={{backgroundColor:"#800080"}} 
          onPress={() => navigation.navigate("AllProduct",{myEmail : `${myEmail}`})}>
             <Text style={{color:"white",textAlign:"center",padding:10}}>View All Product</Text>
         </TouchableOpacity>



    <FlatList 
        style={{paddingBottom:50}}
         keyExtractor={(key) =>{
         return key.seller_id;
             }}
             showsHorizontalScrollIndicator={false}
       
     data={shopdata}
     renderItem={(element)=>{
         return (
          
          <Card style={{padding:5,marginTop:15,borderRadius:22,backgroundColor:'#800080'}}>
          
          <TouchableOpacity onPress={() => navigation.navigate("ShopProfile",{ShopId : element.item.seller_id,myEmail:myEmail})} >
          <Title style={{color:'white',padding:5}}>{element.item.shop_name}</Title>
          <Card.Cover source={{ uri: "https://cucina.com.pk/api/"+element.item.profile_image }} style={{height:175}}/>
          <Card.Content>
            
            <Paragraph  style={{color:'white',padding:5}}>{element.item.shop_address}</Paragraph>
          </Card.Content>
          </TouchableOpacity>
  
  
        {/* <Card.Title style={{marginTop:130}} title="Card Title" subtitle="Card Subtitle"  left={LeftContent} /> */}
          
        </Card>
        


         );
     }}
     />
   </View>
      </View>
      </ScrollView>
     

      
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      backgroundColor:'white',
      justifyContent: 'center',alignItems: 'center'
       // if you want to fill rows left to right
    },
    container2: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      // borderWidth:2,
      margin:5,
      // borderColor:'black',
      backgroundColor:'white',
      justifyContent: 'center',alignItems: 'center'
       // if you want to fill rows left to right
    },
    item: {
      width: '15%' // is 50% of container width
    },
    item1: {
        width: '85%' // is 50% of container width
      },
      item2: {
        width: '100%' // is 50% of container width
      },
      imagestyle:{
        height:23,
        width:23,
        marginTop:18,
        marginLeft:10,
        alignSelf: 'center',
    },
    imagestyle2:{
      height:100,
      width:100,
      marginTop:18,
      marginLeft:10,
      alignSelf: 'center',
  },
    
    
  });

export default MainScreen;