import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import EmailVerification from './src/screens/EmailVerification';
import Home from './src/screens/Home';
import ShopProfile from './src/screens/ShopProfile';
import SearchProduct from './src/screens/SearchProduct';
import UpdateProfile from './src/screens/UpdateProfile';
import ReviewList from './src/screens/ReviewList';
import AddReview from './src/screens/AddReview';
import ProductDetail from './src/screens/ProductDetail';
import AllProduct from './src/screens/AllProduct';
import AddCarts from './src/screens/AddCarts';
import AddCarts2 from './src/screens/AddCarts2';
import RemoveCart from './src/screens/RemoveCart';
import Checkouts from './src/screens/Checkouts';
import Payment from './src/screens/Payment';
import OrderDetail from './src/screens/OrderDetail';


export default function App() {
  const Stack=createNativeStackNavigator();
  return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName="Login">

         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
         <Stack.Screen name="ShopProfile" component={ShopProfile} options={{headerShown: false}}  />
         <Stack.Screen name="SearchProduct" component={SearchProduct} />

         <Stack.Screen name="Register" component={Register} />
         <Stack.Screen name="EmailVerifcation" component={EmailVerification} />
         <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
         <Stack.Screen name="ReviewList" component={ReviewList} />
         <Stack.Screen name="AddReview" component={AddReview} />
         <Stack.Screen name="ProductDetail" component={ProductDetail} />
         <Stack.Screen name="AllProduct" component={AllProduct} />
         <Stack.Screen name="AddCarts" component={AddCarts} />
         <Stack.Screen name="AddCarts2" component={AddCarts2} />
         <Stack.Screen name="RemoveCart" component={RemoveCart} />
         <Stack.Screen name="Checkouts" component={Checkouts} />
         <Stack.Screen name="Payment" component={Payment} />
         <Stack.Screen name="OrderDetail" component={OrderDetail} />
         
         


        


       </Stack.Navigator>
     </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
