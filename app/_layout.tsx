import { View, Text } from 'react-native'
import React from 'react'
import {Stack} from 'expo-router'
const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='index' options={{
            headerShown:false,
        }}/>
        <Stack.Screen name='login' options={{
            headerShown:false,
        }}/>
        <Stack.Screen name='signup' options={{
            headerShown:false,
        }}/>
    </Stack>
  )
}

export default RootLayout