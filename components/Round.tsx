import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
type props = {
    text:string,
    icon: typeof Ionicons.defaultProps,
    onPress?:()=>void;
}
const Round = ({text,icon,onPress}:props) => {
  return (
    <TouchableOpacity style={{alignItems:"center",gap:10}} onPress={onPress}>
        <View style={{
            backgroundColor:"#D3D3D3",
            paddingHorizontal:15,
            paddingVertical:15,
            borderRadius:9999,
        }}>
            <Ionicons name={icon} size={30} color={"black"}/>
        </View>
        <Text style={{
            fontSize:15,
            fontWeight:"500",
        }}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Round