import React, {useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MainScreen from './MainScreen';
import Logout from './Logout';
import UpdateProfile from './UpdateProfile';
import Orders from './Orders';
import Cart from './Cart';

//Screen names
const mainName = "Home";
const logoutName = "Logout";
const updateName = "Update Profile";
const orderName = "Orders";
const cartName = "Cart";

const Tab = createBottomTabNavigator();

function Home({route,navigation}) {
  const myEmail=route.params.myEmail; 
  return (
    // <NavigationContainer>
      <Tab.Navigator
        initialRouteName={mainName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === mainName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === logoutName) {
              iconName = focused ? 'log-out' : 'log-out-outline';

            } else if (rn === updateName) {
              iconName = focused ? 'person' : 'person-outline';
            } else if (rn === orderName) {
              iconName = focused ? 'basket' : 'basket-outline';
            }
            else if (rn === cartName) {
              iconName = focused ? 'cart' : 'cart-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#800080',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={mainName} component={MainScreen}  options={{headerShown: false}} initialParams={{myEmail:myEmail}} />
        <Tab.Screen name={orderName} component={Orders} initialParams={{myEmail:myEmail}}/>
        <Tab.Screen name={cartName} component={Cart} initialParams={{myEmail:myEmail}} />

        <Tab.Screen name={updateName} component={UpdateProfile} initialParams={{myEmail:myEmail}} />
        <Tab.Screen name={logoutName} component={Logout} />
     
      </Tab.Navigator>
    /* </NavigationContainer> */
  );
}



export default Home;