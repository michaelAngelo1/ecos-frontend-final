import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../config/Fonts'

class OrderHistory {
  driverName: string;
  date: string;
  payment: string;
  isOngoing: boolean;

  constructor(driverName: string, date: string, payment: string, isOngoing: boolean) {
    this.driverName = driverName;
    this.date = date;
    this.payment = payment;
    this.isOngoing = isOngoing
  }
}

const Orders = () => {

  const [orderCategory, setOrderCategory] = useState('History');
  let orderCategories: string[] = ['History', 'Ongoing'];

  let order1 = new OrderHistory("Pak Wahyudi", "May 2nd, 06:55", "IDR 12.000", false);
  let order2 = new OrderHistory("Pak Haryanto", "May 4nd, 06:45", "IDR 14.000", false);
  let order3 = new OrderHistory("Pak Setyono", "May 5th, 06:58", "IDR 10.000", false);
  let order4 = new OrderHistory("Pak Chandra", "May 6nd, 17:55", "IDR 12.000", true);

  let orders: OrderHistory[] = [order1, order2, order3, order4];

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <Text className='text-2xl text-black mt-4 ml-5' style={styles.montserratBold}>Orders</Text>
      <View className='flex-row gap-2 ml-2 mt-4'>
        {
          orderCategories.map((category) => (
            <Pressable
              className='w-[110px] h-9 bg-white justify-center items-center rounded-full'
              onPress={() => {
                setOrderCategory(category);
                console.log(category);
              }}
            >
              <Text className={`text-base ${ orderCategory === category ? 'opacity-100' : 'opacity-40'}`} style={styles.montserratSemiBold}>{category}</Text>
            </Pressable>
          ))
        }
      </View>
      <ScrollView>
        <View className='flex flex-col min-h-[100vh] justify-start items-start px-4'>

          
          { 
              orders.filter((e) => {
                return orderCategory == "Ongoing" ? e.isOngoing : !e.isOngoing
              } ).map((orderHistory) => (

                <View className='relative mt-5 w-full h-32 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm'>
                  <View className='absolute top-4 left-4 w-14 h-14 bg-[#fff] border border-green rounded-full'></View>
                  <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>{orderHistory.driverName}</Text>
                  
                  <Text className='absolute top-5 right-3 text-black text-base' style={styles.montserratRegular}>{orderHistory.payment}</Text>
                  {
                    orderHistory.isOngoing ?
                      <Text className='absolute top-10 left-[88px] text-black text-base' style={styles.montserratRegular}>Trip ongoing</Text>
                    :
                      <Text className='absolute top-10 left-[88px] text-black text-base' style={styles.montserratRegular}>Trip finished</Text>
                    
                  }
                  <TouchableOpacity 
                    className="absolute bottom-3 right-3 bg-green w-[104px] rounded-[20px] mt-3 p-2"
                    activeOpacity={0.7}
                  >
                    {
                      orderHistory.isOngoing ?
                        <Text className="text-white text-sm text-center" style={styles.montserratBold}>Track</Text>
                      :
                        <Text className="text-white text-sm text-center" style={styles.montserratBold}>Rejoin</Text>
                    }
                  </TouchableOpacity>
                </View>

              ))
            
          }

          
        </View>
      </ScrollView>
    </SafeAreaView>    
  )
}

export default Orders