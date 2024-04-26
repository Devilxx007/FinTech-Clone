import { View, Text,TouchableOpacity,TextInput} from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { BlurView } from 'expo-blur'

const CustomHeader = () => {
  return (
    <BlurView intensity={80} tint="extraLight" style={{flex:1,marginTop:"8%",marginHorizontal:"2%",backgroundColor: 'rgba(0,0,0,0.05)'}}>
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            {/* View for Profile Circle */}
            <TouchableOpacity style={{backgroundColor:Colors.gray,borderRadius:99999}}>
            <View style={{paddingHorizontal:10,paddingVertical:10}}>
                <Text style={{fontSize:20,fontWeight:"bold",color:"white"}}>AA</Text>
            </View>
            </TouchableOpacity>
            {/* View for search bar */}
            <View style={{flexDirection:"row",alignItems:"center",width:"70%",padding:"2%",margin:"2%",borderRadius:99999,gap:5,backgroundColor:Colors.lightGray}}>
                <Ionicons name='search' size={24} color={"black"}/>
                <View>
                    <TextInput
                    placeholder='Search'
                    style={{fontSize:15}}
                    />
                </View>
            </View>
            {/*View for RoundBtns */}
            <TouchableOpacity  style={{backgroundColor:Colors.lightGray,borderRadius:99999}}>
                <View  style={{paddingHorizontal:10,paddingVertical:10}}>
                <Ionicons name='bar-chart-outline' color={"black"} size={22}/>
                </View>
            </TouchableOpacity>
        </View>
    </BlurView>
  )
}

export default CustomHeader