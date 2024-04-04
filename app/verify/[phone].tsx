import { View, Text, Platform,StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field'

const CELL_COUNT = 6



const Page = () => {
    const {phone,signin} = useLocalSearchParams()
    const [code,setCode] = useState('')
    const {signIn} = useSignIn()
    const {signUp,setActive} = useSignUp()
    const ref = useBlurOnFulfill({value:code,cellCount:CELL_COUNT})
    const [props,getCellOnLayoutHandler] = useClearByFocusCell({
        value:code,
        setValue:setCode
    })
    const router = useRouter()
    useEffect(() => {
      if (code.length === CELL_COUNT) {
          if (signin === 'true') {
              verifySignIn();
          } else {
              verifyCode();
          }
      }
  }, [code]);

    const verifyCode = async()=>{
        try {
            await signUp!.attemptPhoneNumberVerification({
                code
            })
            await setActive!({session:signUp!.createdSessionId});
            router.replace("/(tabs)")
        } catch (error) {
          console.log('error',JSON.stringify(error,null,2))
          if(isClerkAPIResponseError(error)){
            Alert.alert('Error',error.errors[0].message)
          }
        }
    }

    const verifySignIn =async()=>{
        try {
            await signIn!.attemptFirstFactor({
                strategy:"phone_code",
                code
            })
            await setActive!({session:signIn!.createdSessionId});
            router.replace("/(tabs)")
            
        } catch (error) {
          console.log('error',JSON.stringify(error,null,2))
          if(isClerkAPIResponseError(error)){
            Alert.alert('Error',error.errors[0].message)
          }
        }
    }
    
  return (
    <View style={{padding:10,backgroundColor:"white",flex:1}}>
      <Text style={{fontSize:35,letterSpacing:1,fontWeight:"bold"}}>6-digit code</Text>
      <Text style={{fontSize:18,fontWeight:"300"}}>Code sent to {phone} unless you already have an account</Text>

      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"        
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor/> : null)}
          </Text>
        )}
      />

      <View style={{padding:5,marginTop:"5%"}}>
        <Link href={"/login"} replace asChild>
          <Text style={{fontSize:18,color:"#5F00F7",fontWeight:"bold"}}>Already have an account? Log In</Text>
        </Link>
      </View>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
      width: "12%",
      height: 50,
      lineHeight: 50,
      fontSize: 24,
      textAlign: 'center',
      backgroundColor:"#B2BEB5",
      borderRadius:10
    },
    focusCell: {
      borderColor: '#000',
    },
  });