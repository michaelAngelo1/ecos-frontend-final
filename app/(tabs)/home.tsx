import { ScrollView, Text, TouchableOpacity, View, Modal, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../config/Fonts'
import {  router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { adminApprovalInstance, adminSettleDriverOrderHeaderInstance, adminTimeBlockInstance, userDetailInstance } from '../config/axiosConfig'
import { User } from '@/models/User'
import { Image } from 'expo-image'
import icons from '@/constants/icons'
import images from '@/constants/images'

const Home = () => {
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

  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getUserData = async () => {
    try {
      let userToken = await getToken();
      const response = await userDetailInstance(userToken!).get('', );
      setRole(response.data.response.role);
      setEmail(response.data.response.email);
      console.log('USER DATA: ',response.data.response.email);
      const user = new User(
        response.data.response.email,
        response.data.response.password,
        response.data.response.role,
        response.data.response.user_detail
      )
      setUser(user);
    } catch (e) {
      console.log("error get user data: ", e);
    }
  }

  const [customers, setCustomers] = useState([{
    user_id: '',
    email: '',
    password: '',
    role: '',
    user_detail: {
      name: '',
      grade: '',
      street: '',
      phone: '',
      is_admin_approved: false,
      is_email_verified: '',
      is_phone_verified: '',
      profile_image: '',
    }
  }]);

  const [drivers, setDrivers] = useState([{
    user_id: '',
    email: '',
    password: '',
    role: '',
    user_detail: {
      name: '',
      grade: '',
      street: '',
      phone: '',
      is_admin_approved: false,
      is_email_verified: '',
      is_phone_verified: '',
      profile_image: '',
    }
  }]);

  const getAllUsers = async () => {
    try {
      console.log('masuk get all user');
      let userToken = await getToken();
      const response = await adminApprovalInstance(userToken!).get('', );
      console.log(response.data.response.driver);
      console.log(response.data.response.customer);
      setDrivers(response.data.response.driver);
      setCustomers(response.data.response.customer);
    } catch (e) {
      console.log('error fetch all users', e);
    }
  }

  const verifyUser = async (id: string) => {
    try {
      console.log('verify user')
      let userToken = await getToken();
      const response = await adminApprovalInstance(userToken!).post('',
        {
          id: id
        }
      ).then((res) => {
        console.log('USER EMAIL VERIFIED: ', res.data.response.name)
        console.log('VERIF RESPONSE: ', res.data.response.is_admin_approved);
      })
    } catch (e) {
      console.log('error verify user', e)
    }
  }

  const fetchMonthlyJourney = async () => {
    try {
      let userToken = await getToken();
      const response = await adminSettleDriverOrderHeaderInstance(userToken!).get('',);
      console.log('MONTHLY JOURNEY: ', response.data.response[0].user.user_detail);
    } catch (e) {
      console.log('error fetch monthly journey: ', e.response);
    }
  }

  // DRIVER ORDER WAVE
  const [orderWaveList, setOrderWaveList] = useState([{
    time_block_id: '',
    start_date: '',
    end_date: '',
    user: {
      user_id: '',
      email: '',
      password: '',
      role: '',
      created_at: false,
    }
  }]);
  const fetchOrderWave = async () => {
    try {
      let userToken = await getToken();
      const response = await adminTimeBlockInstance(userToken!).get('',);
      console.log('order wave available: ', response.data.response);
      setOrderWaveList(response.data.response);
    } catch (e) { 
      console.log('error fetch order wave: ', e.response);
    }
  }

  useEffect(() => {
    getUserData();
    getAllUsers();
    // fetchMonthlyJourney();
    fetchOrderWave();
    
    // if(role == 'ADMIN') {
    //   console.log('ALL FETCHED USERs', customers);
    //   getAllUsers();
    // }
  }, [])

  console.log('ORDER WAVE LIST: ', orderWaveList[0]);
  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center">
          <View className="bg-white p-6 rounded-lg shadow-lg items-center">
            <Text className="text-green text-center text-lg mb-4" style={styles.montserratBold}>
              You have arrived to your destination. Mind your belongings and thanks for using ECOS!
            </Text>
            <TouchableOpacity
              className="bg-green w-20 py-3 rounded-lg"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-center" style={styles.montserratBold}>End trip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {
        role == 'CUSTOMER' ? 
        <>
          <View className='flex-row gap-1 mt-4 ml-5 mb-4'>
            <Text className='text-2xl text-black' style={styles.montserratRegular}>Welcome, </Text>
            <Text className='text-2xl text-black' style={styles.montserratBold}>{user?.user_detail.name.split(' ')[0]}</Text>
          </View>
          <View className='flex flex-col justify-start items-start px-4'>
            <Text className='text-black text-sm ml-2' style={styles.montserratRegular}>Your current locations</Text>
            <View className='flex-row gap-2 mb-2 items-center'>
              <Image className='w-6 h-6' source={icons.mylocation_icon}/>
              <Text className='text-xl' style={styles.montserratBold}>{user?.user_detail.street}</Text>
            </View>
            <View className='w-96 h-52 bg-white rounded-xl'>
              <Image className='w-96 h-52 rounded-xl' source={images.dummy_maps}/>
            </View>
            <View className='flex-row gap-2 mt-2 mb-2 items-center'>
              <Image className='w-6 h-6' source={icons.destination_icon}/>
              <Text className='text-xl' style={styles.montserratBold}>Binus School Bekasi</Text>
            </View>
            <Text className='text-base ml-2 mb-1' style={styles.montserratSemiBold}>Available drivers to choose</Text>
          </View>
          <ScrollView>
            <View className='flex flex-col justify-start items-start px-4'>
              <View className='relative w-full h-32 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm'>
                <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
                <Image className='absolute top-4 left-4 w-14 h-14 rounded-full' source={images.driver_dummy4}/>
                <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>Bu Lily Halim</Text>
                <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>+62 818 0313 3100</Text>
                <Image className='absolute top-16 left-[80px] w-6 h-6' source={icons.destination_icon}/>
                <Text className='absolute top-12 left-[90px] text-black text-sm p-4' style={styles.montserratRegular}>3 km away</Text>
                <Image className='absolute top-[85px] left-[80px] w-6 h-6' source={icons.passengers_icon}/>
                <Text className='absolute top-[70px] left-[90px] text-black text-sm p-4' style={styles.montserratRegular}>3 persons</Text>
                <Text className='absolute top-5 right-3 text-black text-base' style={styles.montserratRegular}>Rp 1.200.000</Text>
                
                <Text className="absolute bottom-14 right-7 text-blue text-sm text-center" style={styles.montserratRegular}>Matched</Text>
                
                <TouchableOpacity 
                  className="absolute bottom-3 right-3 bg-green w-[104px] rounded-[20px] mt-3 p-2"
                  activeOpacity={0.7}
                  onPress={() => {
                    router.push('/dailyTripDetail') // if ORDER matched  
                    // router.push('/driverDetail') // if BELUM ORDER
                  }}
                >
                  <Text className="text-white text-sm text-center" style={styles.montserratBold}>Track</Text>
                </TouchableOpacity>
              </View>

              <View className='relative w-full h-32 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mt-3'>
                <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
                <Image className='absolute top-4 left-4 w-14 h-14 rounded-full' source={images.driver_dummy}/>
                <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>Pak Budi</Text>
                <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>+62 818 0313 3200</Text>
                <Image className='absolute top-16 left-[80px] w-6 h-6' source={icons.destination_icon}/>
                <Text className='absolute top-12 left-[90px] text-black text-sm p-4' style={styles.montserratRegular}>3 km away</Text>
                <Image className='absolute top-[85px] left-[80px] w-6 h-6' source={icons.passengers_icon}/>
                <Text className='absolute top-[70px] left-[90px] text-black text-sm p-4' style={styles.montserratRegular}>5 persons</Text>


                <Text className='absolute top-5 right-3 text-black text-base' style={styles.montserratRegular}>Rp 1.200.000</Text>
                <TouchableOpacity 
                  className="absolute bottom-3 right-3 bg-green w-[104px] rounded-[20px] mt-3 p-2"
                  activeOpacity={0.7}
                  onPress={() => router.push('/driverDetail')}
                >
                  <Text className="text-white text-sm text-center" style={styles.montserratBold}>Order</Text>
                </TouchableOpacity>
              </View>

              {/* <View className='relative w-full h-32 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mt-3'>
                <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
                <Image className='absolute top-4 left-4 w-14 h-14 rounded-full' source={images.driver_dummy3}/>
                <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>Pak Setyono</Text>
                <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>+62 828 0316 2100</Text>

              
                <Image className='absolute top-16 left-[80px] w-6 h-6' source={icons.destination_icon}/>
                <Text className='absolute top-12 left-[90px] text-black text-sm p-4' style={styles.montserratRegular}>3 km away</Text>
                <Image className='absolute top-[85px] left-[80px] w-6 h-6' source={icons.passengers_icon}/>
                <Text className='absolute top-[70px] left-[90px] text-black text-sm p-4' style={styles.montserratRegular}>4 persons</Text>


                <Text className='absolute top-5 right-3 text-black text-base' style={styles.montserratRegular}>Rp 1.100.000</Text>
                <TouchableOpacity 
                  className="absolute bottom-3 right-3 bg-green w-[104px] rounded-[20px] mt-3 p-2"
                  activeOpacity={0.7}
                  onPress={() => router.push('/driverDetail')}
                >
                  <Text className="text-white text-sm text-center" style={styles.montserratBold}>Order</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </ScrollView>
        </>
        :
        role == 'DRIVER' ? 
        <>
          <View className='flex-row gap-1 mt-4 ml-5 mb-4'>
            <Text className='text-2xl text-black' style={styles.montserratRegular}>Welcome, </Text>
            <Text className='text-2xl text-black' style={styles.montserratBold}>{user?.user_detail.name.split(' ')[0]}</Text>
          </View>
          <ScrollView>
            <View className='flex flex-col justify-start items-start px-4'>
              <Text className='text-xl ml-2 mb-1' style={styles.montserratSemiBold}>Your trip this month</Text>
            </View>
            <View className='w-fit h-36 bg-[#fff] rounded-2xl border border-gray-200 justify-start items-start mx-4 mb-3'>
              <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
              <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>Trip #243881D</Text>
              <Text className='absolute top-1 left-[274px] text-black text-sm p-4' style={styles.montserratMedium}>July 2024</Text>
              <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>Passenger(s): 3 persons</Text>
              <Text className='absolute top-12 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>To: Binus School Bekasi</Text>
              <TouchableOpacity 
                className="absolute bottom-3 right-3 bg-green w-[104px] rounded-[20px] mt-3 p-2"
                activeOpacity={0.7}
                onPress={() => router.push('/tripDetail')}
              >
                <Text className="text-white text-sm text-center" style={styles.montserratBold}>Details</Text>
              </TouchableOpacity>
            </View>

            <View className='flex flex-col justify-start items-start px-4'>
              <Text className='text-xl ml-2 mb-1' style={styles.montserratSemiBold}>Your daily trip</Text>
            </View>
            <View className='w-fit h-44 bg-[#fff] rounded-2xl border border-gray-200 justify-start items-start mx-4 mb-3'>
              <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
              <Text className='absolute top-[2px] left-[70px] text-black text-base p-4' style={styles.montserratSemiBold}>Daily Trip #243881D</Text>
              <Text className='absolute top-1 left-[264px] text-black text-sm p-4' style={styles.montserratMedium}>12/07/2024</Text>
              <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>Passenger(s): 3 persons</Text>
              <Text className='absolute top-12 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>To: Binus School Bekasi</Text>
              <Text className='absolute top-[68px] left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>Scheduled for: 06:00 - 07:00</Text>
              <Text className='absolute bottom-0 left-0 text-black text-sm p-4' style={styles.montserratMedium}>Your trip is ongoing</Text>
              <TouchableOpacity 
                className="absolute bottom-3 right-3 bg-green w-[104px] rounded-[20px] mt-3 p-2"
                activeOpacity={0.7}
                onPress={() => router.push('/dailyTripDetail')}
              >
                <Text className="text-white text-sm text-center" style={styles.montserratBold}>Details</Text>
              </TouchableOpacity>
            </View>
            <View className='flex flex-col justify-start items-start px-4'>
              <Text className='text-xl ml-2 mb-1' style={styles.montserratSemiBold}>Your passengers this month</Text>
            </View>
            <ScrollView className='min-h-[365px] overflow-auto'>
              <View className='flex flex-col justify-start items-start px-4'>
                <View className='relative w-full h-28 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm'>
                  <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
                  <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>Max Quok</Text>
                  <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>+62 818 0313 3100</Text>
                  <Text className='absolute top-12 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>Jl. Kendangsari 1 No. 5</Text>
                </View>

                <View className='relative w-full h-28 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mt-3'>
                  <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
                  <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>Steven Halim</Text>
                  <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>+62 828 0316 2100</Text>
                  <Text className='absolute top-12 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>Jl. Mulyosari 2 No. 3</Text>
                </View>

                <View className='relative w-full h-28 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mt-3'>
                  <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
                  <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>Mike Angelo</Text>
                  <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>+62 828 0316 2100</Text>
                  <Text className='absolute top-12 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>Jl. Galaxy Bumi Permai V No. 5</Text>
                </View>

                
              </View>
            </ScrollView>
            <View className='flex flex-col justify-start items-start px-4'>
              <Text className='text-xl ml-2 mb-1' style={styles.montserratSemiBold}>Choose who to pick up first</Text>
              {/* Logic prioritize pick-up:
              1. Pressable component: 'Prioritize Pick-up' triggers Pop-up
              2. Pop-up shows a PRESSABLE list of passengers with its corresponding address: Max Quok - address, Steven Halim - address,  Aditya David - address
              3. Passenger is FIRST pressed -> change bgcolor to blue and add '1' in front of the name
              4. Passenger is SECOND pressed -> change bgcolor to green and add '2' in front of the name
              5. So on and so forth
              6. 'Clear config' and 'Save config' options
              7. 'Clear config' clears all state and returns the bgcolor of all list to white
              8. 'Save config' saves all state and THIS CAN be seen by EACH PASSENGER */}
              <TouchableOpacity 
                className="bg-[#fff] border-2 border-green w-full h-12 mt-3 p-2 items-center justify-center"
                activeOpacity={0.7}
                onPress={() => router.replace('/paymentProcess')}
                disabled={true}
              >
                <Text className="text-green text-sm text-center" style={styles.montserratBold}>Click to prioritize </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
        :
        role == 'ADMIN' ? 
        <>
          <View className='flex-row gap-1 mt-4 ml-5 mb-4'>
            <Text className='text-2xl text-black' style={styles.montserratRegular}>Welcome, </Text>
            <Text className='text-2xl text-black' style={styles.montserratBold}>{user?.user_detail.name.split(' ')[0]}</Text>
          </View>
          <ScrollView>
            <View className='flex flex-col justify-start items-start px-4'>
              <Text className='text-base ml-2 mb-1' style={styles.montserratSemiBold}>Passengers who need to be verified</Text>
              {
                customers.length > 0 ?
                  customers?.map((item, index) => {
                    return(
                      <View key={index} className='relative w-full h-32 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mt-3'>
                        <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
                        <Image className='absolute top-4 left-4 w-14 h-14 rounded-full' source={{ uri: item.user_detail.profile_image }} />
                        <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>{item.user_detail.name}</Text>
                        <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>{item.email}</Text>
                        <TouchableOpacity 
                          className="absolute bottom-3 right-3 bg-green w-[104px] rounded-[20px] mt-3 p-2"
                          activeOpacity={0.7}
                          disabled={item.user_detail.is_admin_approved ? true : false}
                          onPress={() => 
                            {
                              verifyUser(item.user_id);
                              getAllUsers();
                            }
                          }
                        >
                          {
                            item.user_detail.is_admin_approved ?
                              <Text className="text-white text-sm text-center" style={styles.montserratBold}>Verified</Text>
                            :
                              <Text className="text-white text-sm text-center" style={styles.montserratMedium}>Verify</Text>

                          }
                        </TouchableOpacity>
                      </View>
                    )
                  })
                :
                <View className='w-full h-14 justify-center items-center'>
                  <Text style={styles.montserratRegular}>No passengers need to be verified</Text>
                </View>
              }
              <Text className='text-base ml-2 mb-1' style={styles.montserratSemiBold}>Partners who need to be verified</Text>
              {
                drivers.length > 1 ?
                  drivers?.map((item, index) => {
                    return(
                      <View key={index} className='relative w-full h-32 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mt-3'>
                        <View className='absolute top-4 left-4 w-14 h-14 bg-green rounded-full'></View>
                        <Image className='absolute top-4 left-4 w-14 h-14 rounded-full' source={{ uri: item.user_detail.profile_image }} />
                        <Text className='absolute top-0 left-[70px] text-black text-lg p-4' style={styles.montserratSemiBold}>{item.user_detail.name}</Text>
                        <Text className='absolute top-7 left-[70px] text-black text-sm p-4' style={styles.montserratRegular}>{item.email}</Text>
                        <TouchableOpacity 
                          className="absolute bottom-3 right-3 bg-green w-[104px] rounded-[20px] mt-3 p-2"
                          activeOpacity={0.7}
                          disabled={item.user_detail.is_admin_approved ? true : false}
                          onPress={() => 
                            {
                              verifyUser(item.user_id);
                              getAllUsers();
                            }
                          }
                        >
                          {
                            item.user_detail.is_admin_approved ?
                              <Text className="text-white text-sm text-center" style={styles.montserratBold}>Verified</Text>
                            :
                              <Text className="text-white text-sm text-center" style={styles.montserratMedium}>Verify</Text>

                          }
                        </TouchableOpacity>
                      </View>
                    )
                  })
                :
                <View className='w-full h-14 justify-center items-center'>
                  <Text style={styles.montserratRegular}>No partners need to be verified</Text>
                </View>
              }
            </View>
          </ScrollView>
        </>
        :
        <View className='w-full h-full items-center justify-center'>
          <ActivityIndicator size="large" color="green" />

        </View>
      }
    </SafeAreaView>
  )
}

export default Home;
