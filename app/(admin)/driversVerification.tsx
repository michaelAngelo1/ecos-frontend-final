import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HomeUserCard from '@/components/HomeUserCard';
import { ModelUserInterface } from '../config/ModelInterface';
import { styles } from '../config/Fonts';
import HomeLayout from '../layout/HomeLayout';
import { adminApprovalInstance } from '../config/axiosConfig';
import useGetAllUsers from '@/hooks/useGetAllUsers';
import useGetToken from '@/hooks/useGetToken';
import useGetUserData from '@/hooks/useGetUserData';

const driversVerification = () => {
  const [modalVisible, setModalVisible] = useState(false);
  
  const { token } = useGetToken();
  const { user } = useGetUserData(token);
  const { customers, drivers, refetch } = useGetAllUsers(token);

  const verifyUser = async (id: string) => {
    try {
      console.log("verify user");
      await adminApprovalInstance(token!)
        .post("", {
          id: id,
        })
        .then((res) => {
          console.log("USER EMAIL VERIFIED: ", res.data.response.name);
          console.log("VERIF RESPONSE: ", res.data.response.is_admin_approved);
        });
    } catch (e) {
      console.log("error verify user", e);
    }
  };

  return (
    <HomeLayout modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <View className='flex flex-col mx-4 mt-3'>
        <Text
          className="text-2xl ml-2 mb-1"
          style={styles.montserratBold}
        >
          Verify partners registration
        </Text>
        <Text
          className="text-base ml-2 mb-1"
          style={styles.montserratSemiBold}
        >
          Partners who need to be verified
        </Text>
      </View>
      <ScrollView>
        <View className="flex flex-col justify-start items-start px-4">
          {drivers.length > 0 ? (
            drivers?.map((item: ModelUserInterface, index: React.Key | null | undefined) => (
              <HomeUserCard
                user={item}
                refetch={refetch}
                verifyUser={verifyUser}
                key={index}
              />
            ))
          ) : (
            <View className="w-full h-14 justify-center items-center">
              <Text style={styles.montserratRegular}>
                No partners need to be verified
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
    </HomeLayout>
  )
}

export default driversVerification