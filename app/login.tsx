import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/build/Ionicons'
import { useSignIn } from '@clerk/clerk-expo'


enum SignInType {
  phone,
  google,
  apple,
  facebook
}
const Login = () => {
  const [countryCode, setcountryCode] = useState('+91')
  const [mobile, setMobile] = useState('')
  const {signIn} = useSignIn()
  const router = useRouter()
  const onSignIn = async(type: SignInType)=>{
    if(type === SignInType.phone){
      try {
        const fullphoneNumber = `${countryCode}${mobile}`
        const {supportedFirstFactors} = await signIn!.create({
          identifier:fullphoneNumber
        })
        const firstPhoneFactor: any = supportedFirstFactors.find((factor:any)=>{
          return factor.strategy ==='phone_code';
        })
        const {phoneNumberId} = firstPhoneFactor;
        await signIn!.prepareFirstFactor({
          strategy:'phone_code',
          phoneNumberId,
        })

        router.push({pathname: '/verify/[phone]',params:{phone:fullphoneNumber,signin:true}})
      } catch (error) {
        
      }
    }
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={80}
    >
      <View style={styles.container}>
        <View style={{ padding: 5, marginLeft: '3%' }}>
          <Text style={styles.header}>Welcome Back!</Text>
        </View>
        <View style={{ padding: 8 }}>
          <Text style={{ fontSize: 15, color: 'gray', fontWeight: '500' }}>
            Enter the phone number associated with your account.
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
            gap: 5
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: '#E5E4E2',
              borderRadius: 20,
              paddingVertical: 20
            }}
          >
            <TextInput
              placeholder="Country Code"
              placeholderTextColor={'gray'}
              keyboardType="numeric"
              onChangeText={setcountryCode}
              value={countryCode}
              style={styles.country_field}
            />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#E5E4E2',
                borderRadius: 20,
                paddingVertical: 20
              }}
            >
              <TextInput
                placeholder="Mobile Number"
                placeholderTextColor={'gray'}
                keyboardType="numeric"
                style={styles.input_field}
                onChangeText={setMobile}
                value={mobile}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: 10, marginTop: '5%' }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'black',
              paddingVertical: 10,
              borderRadius: 99999
            }}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 22,
                fontWeight: 'bold'
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginTop: '5%'
          }}
        >
          <View
            style={{
              borderWidth: 0.2,
              flex: 1,
              height: 1,
              borderColor: '#D3D3D3'
            }}
          />
          <Text style={{ fontSize: 18 }}>or</Text>
          <View
            style={{
              borderWidth: 0.2,
              flex: 1,
              height: 1,
              borderColor: '#D3D3D3'
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            marginTop: '5%'
          }}
        >
          <TouchableOpacity
          onPress={()=>onSignIn(SignInType.apple)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingHorizontal: '15%',
              paddingVertical: 15,
              borderRadius: 9999,
              backgroundColor: '#BEBEBE'
            }}
          >
            <Ionicons name="logo-apple" size={28} color="black" />
            <Text style={{ fontSize: 18 }}>Continue with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>onSignIn(SignInType.google)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingHorizontal: '15%',
              paddingVertical: 15,
              borderRadius: 9999,
              backgroundColor: '#BEBEBE'
            }}
          >
            <Ionicons name="logo-google" size={28} color="black" />
            <Text style={{ fontSize: 18 }}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>onSignIn(SignInType.facebook)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingHorizontal: '15%',
              paddingVertical: 15,
              borderRadius: 9999,
              backgroundColor: '#BEBEBE'
            }}
          >
            <Ionicons name="logo-facebook" size={28} color="black" />
            <Text style={{ fontSize: 18 }}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    fontSize: 38,
    fontWeight: 'bold',
    letterSpacing: 1
  },
  input_field: {
    fontSize: 18,
    letterSpacing: 1,
    marginLeft: 9
  },
  country_field: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})
