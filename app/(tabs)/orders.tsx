import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../config/Fonts'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userDetailInstance } from '../config/axiosConfig';

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

  const getToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken")
      if (userToken !== null) {
        console.log("User token read: ", userToken);
        return userToken;
      }
    } catch (e) {
      console.log("Error reading JWT", e);
    }
  } 

  // const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const getUserData = async () => {
    try {
      let userToken = await getToken();
      const response = await userDetailInstance(userToken!).get('', );
      setRole(response.data.response.role);
      console.log(response.data.response.role);
      // setEmail(response.data.response.email);
      console.log('response',response.data.response.role);
    } catch (e) {
      console.log("error get user data: ", e);
    }
  }

  useEffect(() => {
    getUserData();
  }, [])
  

  /* 
    TODO:
    1. Get token stored on AsyncStorage
    2. Get user detail by token
    3. Get ROLE from user detail
    4. If ROLE == 'Passenger', show Passenger Orderpage
    5. Else if ROLE == 'Partner', show Partner Orderpage
    6. Also fetch the name to show on 'Welcome, {name}'
  */
  
  // dummy state role variable, replace LATER
  // let role = 'Passenger'; // Partner or Passenger

  const [orderCategory, setOrderCategory] = useState('History');
  let orderCategories: string[] = ['History', 'Ongoing'];

  let order1 = new OrderHistory("Pak Wahyudi", "May 2nd, 06:55", "IDR 12.000", false);
  let order2 = new OrderHistory("Pak Haryanto", "May 4nd, 06:45", "IDR 14.000", false);
  let order3 = new OrderHistory("Pak Setyono", "May 5th, 06:58", "IDR 10.000", false);
  let order4 = new OrderHistory("Pak Chandra", "May 6nd, 17:55", "IDR 12.000", true);
  let order5 = new OrderHistory("Pak Agung", "June 6th, 06:47", "IDR 14.000", true);

  let orders: OrderHistory[] = [order1, order2, order3, order4, order5];

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      {
        role == 'CUSTOMER' ?
        <>
          <Text className='text-2xl text-black mt-4 ml-5' style={styles.montserratBold}>Orders</Text>
          <View className='flex-row gap-2 ml-2 mt-4'>
            {
              orderCategories.map((category) => (
                <Pressable
                  key={category}
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
            <View className='flex flex-col justify-start items-start px-4'>
              
              { 
                  orders.filter((e) => {
                    return orderCategory == "Ongoing" ? e.isOngoing : !e.isOngoing
                  } ).map((orderHistory) => (

                    <View key={orderHistory.driverName} className='relative mt-5 w-full h-32 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm'>
                      <View className='absolute top-4 left-4 w-14 h-14 bg-green border border-green rounded-full'></View>
                      <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>{orderHistory.driverName}</Text>
                      
                      <Text className='absolute top-5 right-3 text-black text-base' style={styles.montserratRegular}>{orderHistory.payment}</Text>
                      {
                        orderHistory.isOngoing ?
                          <Text className='absolute top-10 left-[88px] text-black text-sm' style={styles.montserratRegular}>Trip ongoing</Text>
                        :
                          <Text className='absolute top-10 left-[88px] text-black text-sm' style={styles.montserratRegular}>Trip finished</Text>
                        
                      }
                      <Text className='absolute top-14 left-[88px] text-black text-sm' style={styles.montserratRegular}>{orderHistory.date}</Text>
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
        </>
        : role == 'DRIVER' ?
        <>
          <View className='flex-row gap-1 mt-4 ml-5 mb-4'>
            <Text className='text-2xl text-black' style={styles.montserratBold}>Orders</Text>
          </View>
          <View className='flex flex-col justify-start items-start px-4'>
            <Text className='text-xl ml-2 mb-1' style={styles.montserratSemiBold}>Your passengers this month</Text>
            <Text className='text-base ml-2 mb-1' style={styles.montserratMedium}>July 2024</Text>
          </View>
          <ScrollView className='min-h-[365px] overflow-auto'>
              <View className='flex flex-col justify-start items-start px-4'>
                <View className='relative w-full h-28 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm'>
                  <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
                  <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>Max Quok</Text>
                  <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>+62 818 0313 3100</Text>
                  <Text className='absolute top-12 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>Jl. Meruya No. 7 Jakarta Barat</Text>
                </View>

                <View className='relative w-full h-28 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mt-3'>
                  <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
                  <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>Steven Halim</Text>
                  <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>+62 828 0316 2100</Text>
                  <Text className='absolute top-12 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>Jl. Meruya No. 7 Jakarta Barat</Text>
                </View>

                <View className='relative w-full h-28 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mt-3'>
                  <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
                  <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>Aditya David</Text>
                  <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>+62 828 0316 2100</Text>
                  <Text className='absolute top-12 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>Jl. Meruya No. 7 Jakarta Barat</Text>
                </View>

                
              </View>
            </ScrollView>
            <View className='flex flex-col justify-start items-start px-4'>
            <Text className='text-xl ml-2 mb-1 mt-3' style={styles.montserratSemiBold}>Your order request this month</Text>
            <Text className='text-base ml-2 mb-1' style={styles.montserratMedium}>July 2024</Text>
          </View>
          <ScrollView className='min-h-[365px] overflow-auto'>
              <View className='flex flex-col justify-center items-center px-4'>
                <Text className='text-sm text-black' style={styles.montserratRegular}>No order request for this month</Text>
              </View>
            </ScrollView>
        </>
        : role == "ADMIN" ?
        <>
          <Text>Admin orderpage</Text>
        </>
        :
        <View className='w-full h-full items-center justify-center'>
          <ActivityIndicator size="large" color="green" />

        </View>
      }
    </SafeAreaView>    
  )
}

export default Orders