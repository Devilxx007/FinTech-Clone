import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {Stack, useRouter,Link} from 'expo-router'
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
           headerShadowVisible:false,
           headerLeft:()=>(
             <TouchableOpacity onPress={router.back}>
               <Ionicons name='arrow-back' color={"black"} size={28}/>
             </TouchableOpacity>
           ),
           headerRight:()=>(
             <Link href={"/help"} asChild>
               <TouchableOpacity>
               <Ionicons name="help-circle-outline" size={30} color="black" />
             </TouchableOpacity>
             </Link>
           )
           
        }}/>
        <Stack.Screen name='signup' options={{
            headerTitle:"",
            headerShadowVisible:false,
            headerLeft:()=>(
              <TouchableOpacity onPress={router.back}>
                <Ionicons name='arrow-back' color={"black"} size={28}/>
              </TouchableOpacity>
            ),
            headerRight:()=>(
              <Link href={"/help"} asChild>
                <TouchableOpacity>
                <Ionicons name="help-circle-outline" size={30} color="black" />
              </TouchableOpacity>
              </Link>
            )
        }}/>
        <Stack.Screen name='help' options={{
          presentation:"modal"
        }}/>
    </Stack>
  )
}

export default RootLayout