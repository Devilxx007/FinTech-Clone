import { View, Text, ScrollView,FlatList,StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Round from '@/components/Round'
import { useBalance } from '@/context/balanceContext'
import { Ionicons } from '@expo/vector-icons'
import Tile from '@/components/SortableList/Tile'
const Home = () => {
  const data = [
    { id: 'recent' },
    { id: 'cards' },
    { id: 'cashback' },
    { id: 'spent' },
  ];
  const renderItem = ({ item }:any) => (
    <Tile onLongPress={() => true} id={item.id} />
  );
  const { addRandomTransaction, getBalance, clearTransactions, transactions } =
    useBalance()
  const onAddMoney = () => {
    addRandomTransaction()
  }
  const onClear = () => {
    clearTransactions()
  }
  const currentBalance = getBalance()
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
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
              {currentBalance}
            </Text>
            <Text style={{ fontSize: 22, fontWeight: '700' }}>€</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20
          }}
        >
          <Round text="Add Money" icon={'add'} onPress={onAddMoney} />
          <Round text="Exchange" icon={'refresh'} onPress={onClear} />
          <Round text="Details" icon={'list'} />
          <Round text="More" icon={'ellipsis-horizontal'} />
        </View>

        <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 5 }}>
          Transactions
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 15,
            margin: 10
          }}
        >
          {transactions.length === 0 && (
            <Text style={{ fontSize: 18, padding: 5, fontWeight: '500' }}>
              No transactions yet
            </Text>
          )}
          {transactions.map((item : any) => (
            <View key={item.id} style={{flexDirection:"row",padding:5,alignItems:"center",margin:5}}
            >
              <View
                style={{
                  backgroundColor: '#D3D3D3',
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                  borderRadius: 9999
                }}
              >
                <Ionicons
                  name={item.amount > 0 ? 'add' : 'remove'}
                  size={24}
                  color={'black'}
                />
              </View>
              <View style={{paddingHorizontal:5,flex:1}}>
                <Text style={{fontSize:20,fontWeight:"bold"}}>Added Money</Text>
                <Text style={{fontSize:15,}}>{item.date}</Text>
              </View>
              <View>
                <Text style={{fontSize:18,fontWeight:"bold"}}>${item.amount}</Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 5 }}>Widgets</Text>
        <FlatList
        numColumns={2}
        data = {data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        columnWrapperStyle={styles.columnWrapper}
        />
        </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
  columnWrapper: {
    paddingHorizontal:5,
    paddingVertical:10,
    justifyContent:"space-between",
    gap:8,
    marginRight:5
  },
});
export default Home
