import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image} from "react-native";
import React,{useState} from "react";

import {Picker} from "@react-native-picker/picker";

const Logout = ({navigation })=>{
    navigation.navigate("Login");
    return(
        <Text>Logout</Text>
        );
}

export default Logout;