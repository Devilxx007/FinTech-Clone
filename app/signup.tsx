import { View, Text,StyleSheet, TouchableOpacity, TextInput,KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { useSignUp } from '@clerk/clerk-expo'
const SignUp = () => {
  const [countryCode,setcountryCode] = useState('+91')
  const [mobile,setMobile] = useState("")
  const router = useRouter()
  const {signUp} = useSignUp();

  const onSignUp = async ()=>{
    const fullphoneNumber = `${countryCode}${mobile}`;
    try {
      await signUp!.create({
        phoneNumber:fullphoneNumber,
      })
      signUp!.preparePhoneNumberVerification();
      router.push({pathname:'/verify/[phone]',params:{phone:fullphoneNumber}})
    } catch (error) {
      console.error("Error signing up",error)
    }
  }

  
  return (
    <KeyboardAvoidingView style={{flex:1}} behavior='padding' keyboardVerticalOffset={Platform.OS==="ios"?90:80}>
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
          onChangeText={setMobile}
          value={mobile}/>
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
        <TouchableOpacity onPress={onSignUp} style={{backgroundColor:"black",paddingVertical:10,borderRadius:99999}}>
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
    marginLeft:9,
  },
  country_field:{
    fontSize:15,
    textAlign:"center",
    fontWeight:"bold",
    padding:"5%"
  }
})