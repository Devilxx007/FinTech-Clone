import { View, Text,StyleSheet, TouchableOpacity, TextInput,KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
const SignUp = () => {
  const [countryCode,setcountryCode] = useState('+91')
  return (
    <KeyboardAvoidingView style={{flex:1}} behavior='padding' keyboardVerticalOffset={80}>
    <View style={styles.container}>
      <View style={{padding:5,marginLeft:"3%"}}>
        <Text style={styles.header}>Let's get started!</Text>
      </View>
      <View style={{padding:8}}>
        <Text style={{fontSize:15,color:"gray",fontWeight:"500"}}>Enter your phone number.We will send you a confirmation code there.</Text>
      </View>
      <View style={{flexDirection:"row",padding:10,alignItems:"center",gap:5}}>
      <TouchableOpacity style={{backgroundColor:"#E5E4E2",borderRadius:20,paddingVertical:20}}>
          <TextInput
          placeholder='Country Code'
          placeholderTextColor={"gray"}
          keyboardType='numeric'
          onChangeText={setcountryCode}
          value={countryCode}
          style={styles.country_field}
          />
        </TouchableOpacity>
        <View style={{flex:1}}>
        <TouchableOpacity style={{backgroundColor:"#E5E4E2",borderRadius:20,paddingVertical:20}}>
          <TextInput
          placeholder='Mobile Number'
          placeholderTextColor={"gray"}
          keyboardType='numeric'
          style={styles.input_field}
          />
        </TouchableOpacity>
        </View>
      </View>
      <View style={{padding:5,marginTop:"5%"}}>
        <Link href={"/login"} replace asChild>
          <Text style={{fontSize:18,color:"#5F00F7",fontWeight:"bold"}}>Already have an account? Log In</Text>
        </Link>
      </View>
      <View style={{flex:1}}></View>
      <View style={{padding:10}}>
        <TouchableOpacity style={{backgroundColor:"black",paddingVertical:10,borderRadius:99999}}>
          <Text style={{color:"white",textAlign:"center",fontSize:22,fontWeight:"bold"}}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAvoidingView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white",
  },
  header:{
    fontSize:38,
    fontWeight:"bold",
    letterSpacing:1,
  },
  input_field:{
    fontSize:18,
    letterSpacing:1,
    marginLeft:9
  },
  country_field:{
    fontSize:18,
    textAlign:"center",
    fontWeight:"bold"
  }
})