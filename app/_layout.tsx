import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {Stack, useRouter} from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const RootLayout = () => {
  const router = useRouter();
  return (
    <Stack>
        <Stack.Screen name='index' options={{
            headerShown:false,
        }}/>
        <Stack.Screen name='login' options={{
           headerTitle:"",
           
        }}/>
        <Stack.Screen name='signup' options={{
            headerTitle:"",
            headerShadowVisible:false,
            headerLeft:()=>(
              <TouchableOpacity onPress={router.back}>
                <Ionicons name='arrow-back' color={"black"} size={28}/>
              </TouchableOpacity>
            )
        }}/>
    </Stack>
  )
}

export default RootLayout