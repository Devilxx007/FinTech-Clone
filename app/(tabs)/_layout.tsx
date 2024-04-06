import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Tabs } from 'expo-router'
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {BlurView} from 'expo-blur'
const TabLayout = () => {
  
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor:"blue",
      tabBarLabelStyle:{
        fontSize:14,
        fontWeight:'bold'
      },
      tabBarBackground: () => (
        <BlurView
          intensity={100}
          tint={'extraLight'}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.05)',
          }}
        />
      ),
      tabBarStyle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        borderTopWidth: 0,
      },
    }}>
        <Tabs.Screen name='index' options={{
          title: 'Home',
          headerShown:false,
          tabBarIcon:()=>(
            <Entypo name="home" size={28} color="black" />
          )
        }}/>
        <Tabs.Screen name='invest' options={{
          title:"Invest",
          headerShown:false,
          tabBarIcon:()=>(
            <Octicons name="graph" size={28} color="black" />
          )
        }}/>
        <Tabs.Screen name='transfers' options={{
          title:"Transfer",
          headerShown:false,
          tabBarIcon:()=>(
            <FontAwesome6 name="money-bill-transfer" size={28} color="black" />
          )
        }}/>
        <Tabs.Screen name='crypto' options={{
          title:"Crypto",
          headerShown:false,
          tabBarIcon:()=>(
            <FontAwesome name="bitcoin" size={28} color="black" />
          )
        }}/>
        <Tabs.Screen name='lifestyle' options={{
          title:"Lifestyle",
          headerShown:false,
          tabBarIcon:()=>(
            <MaterialCommunityIcons name="dots-grid" size={28} color="black" />
          )
        }}/>
    </Tabs>
  )
}

export default TabLayout