import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image,FlatList} from "react-native";
import React,{useState,useEffect} from "react";


const ShopProfile = ({route,navigation})=>{
    const ShopId=route.params.ShopId; 
    const myEmail=route.params.myEmail;
    const [shopname,setshopName]=useState("");
    const [shoptype,setshopType]=useState("");
    const [companyslogan,setcompanySlogan]=useState("");
    const [footertext,setfooterText]=useState("");
    const [headercolor,setheaderColor]=useState("");
    const [footercolor,setfooterColor]=useState("");
    const [shopaddress,setshopAddress]=useState("");

    const [productdata,setproductdata] = useState("");
  var fetchInsertApi="https://cucina.com.pk/api/user/fetch_product.php?shopid="+ShopId;
      var headers={
          'Accept':'application/json',
          'Content-Type':'application.json'
      };

      const getUserDate2 = async () =>{
        if(productdata ==""){
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
        };

    const getUserDate = async () =>{

        if(shopname == "")
        {
        try {
            const response = await fetch("https://cucina.com.pk/api/user/getSellerDetail.php?shopid="+ShopId);
            const MyData=await response.json();
            // setmyUserData(MyData);
            console.log(MyData);
                setshopName(MyData[0].shop_name);
                setshopType(MyData[0].shop_type);
                setcompanySlogan(MyData[0].company_slogan);
                setfooterText(MyData[0].footer_text);
                setheaderColor(MyData[0].header_color);
                setfooterColor(MyData[0].footer_color);
                setshopAddress(MyData[0].shop_address);
            
            

    
        } catch (error) {
            console.log(error);
        }
      }
    };
    
    useEffect( () => {
      getUserDate();
      getUserDate2();
      return () => {
        
    }
    }),[];

    return(

       <View style={{flex:1,backgroundColor:'white'}}>
           
           <View style={{height:120,backgroundColor:headercolor,borderRadius:20}}>

               <Text style={{fontSize:20,marginTop:30,marginStart:20,color:'#FFFFFF'}}>{shopname}</Text>
               <Text style={{fontSize:15,marginTop:5,marginStart:20,color:'#FFFFFF'}}>({companyslogan})</Text>
               <Text style={{fontSize:15,marginTop:5,marginStart:20,color:'#FFFFFF'}}>Address : {shopaddress}</Text>

           </View>


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

     



           <View style={{height:69,width:'100%',borderRadius:20,justifyContent: 'center',alignItems: 'center',position: 'absolute',bottom:0}}>
               <Text style={{color:'#800080',justifyContent:'center',alignItems:'center',textAlign:'center',fontWeight:'bold'}} onPress={() => navigation.navigate("ReviewList",{ShopId : ShopId,myEmail:myEmail})}>+ View Reviews</Text>
               <View style={{backgroundColor:footercolor,height:60,width:'100%'}}>
               <Text style={{fontSize:15,textAlign:'center',marginTop:5,color:'#FFFFFF'}}>{footertext}</Text>
               </View>
           </View>

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
      backgroundColor:'white',
      margin:5,
      justifyContent: 'center',alignItems: 'center'// if you want to fill rows left to right
    },
    item: {
      width: '50%',
      backgroundColor:"black",
      

       // is 50% of container width
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
export default ShopProfile;