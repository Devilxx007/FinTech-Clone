import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Round from '@/components/Round'
const Home = () => {
  const onAddMoney = () => {}
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ margin: 80, alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}
          >
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>1499</Text>
            <Text style={{ fontSize: 22, fontWeight: '700' }}>€</Text>
          </View>
        </View>
        <View
            style={{
              flexDirection:'row',
              justifyContent:"space-between",
              padding:20
            }}
          >
            <Round text="Add Money" icon={'add'} onPress={onAddMoney} />
            <Round text="Exchange" icon={'refresh'} onPress={onAddMoney} />
            <Round text="Details" icon={'list'} onPress={onAddMoney} />
            <Round text='More' icon={'ellipsis-horizontal'}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
