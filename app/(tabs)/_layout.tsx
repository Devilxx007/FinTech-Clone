import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const TabLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor:"blue",
    }}>
        <Tabs.Screen name='index' options={{
          title: 'Home',
          headerShown:false,
          tabBarIcon:()=>(
            <Entypo name="home" size={24} color="black" />
          )
        }}/>
        <Tabs.Screen name='invest' options={{
          title:"Invest",
          headerShown:false,
          tabBarIcon:()=>(
            <Octicons name="graph" size={24} color="black" />
          )
        }}/>
        <Tabs.Screen name='transfer' options={{
          title:"Transfer",
          headerShown:false,
          tabBarIcon:()=>(
            <FontAwesome6 name="money-bill-transfer" size={24} color="black" />
          )
        }}/>
        <Tabs.Screen name='crypto' options={{
          title:"Crypto",
          headerShown:false,
          tabBarIcon:()=>(
            <FontAwesome name="bitcoin" size={24} color="black" />
          )
        }}/>
        <Tabs.Screen name='lifestyle' options={{
          title:"Lifestyle",
          headerShown:false,
          tabBarIcon:()=>(
            <MaterialCommunityIcons name="dots-grid" size={24} color="black" />
          )
        }}/>
    </Tabs>
  )
}

export default TabLayout