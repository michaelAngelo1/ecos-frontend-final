import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/app/config/Fonts'
import Loading from './Loading'
import { DriverRegisInterface } from '@/app/config/Interface'


interface DriverRegisCardInterface {
  driver: DriverRegisInterface
  refetch: () => Promise<void>
  handleAdminApproveDriverRegistration: (a: string, b: string, c: string, d: boolean) => Promise<void>
}

const DriverRegisCard = (prop: DriverRegisCardInterface) => {

  const [loading, setLoading] = useState<boolean>(false);

  async function handleApproveRegistration(adminApproved: boolean) {
    setLoading(true);
    await prop.handleAdminApproveDriverRegistration(prop.driver.order_id, prop.driver.driver_id, prop.driver.admin_time_block.time_block_id, adminApproved);
    await prop.refetch();
    setLoading(false);
  }

  return (
    <View key={prop.driver.order_id}
      className="relative w-full h-48 bg-[#fff] rounded-2xl border border-gray-200 shadow-sm mb-3 p-3"
    >
      <View className="flex flex-row gap-3">
        <View className="w-16 h-16 bg-green rounded-full"></View>
        <View className="flex flex-col">
          <Text
            className="text-black text-lg"
            style={styles.montserratSemiBold}
          >
            {prop.driver.user.user_detail.name}
          </Text>
          <Text
            className=" text-black text-sm"
            style={styles.montserratRegular}
          >
            {prop.driver.user.email}
          </Text>
          <Text
            className=" text-black text-sm"
            style={styles.montserratRegular}
          >
            {prop.driver.user.user_detail.phone}
          </Text>
          <Text
            className=" text-black text-xs"
            style={styles.montserratRegular}
          >
            Requested registration as driver
          </Text>
          <Text
            className=" text-black text-xs"
            style={styles.montserratRegular}
          >
            On period:{" "}
            {prop.driver.admin_time_block.start_date.substring(
              0,
              10
            )}{" "}
            to{" "}
            {prop.driver.admin_time_block.end_date.substring(
              0,
              10
            )}
          </Text>
        </View>
      </View>

      <View className="flex-col items-end">
        {prop.driver.is_admin_approved ? (
          <TouchableOpacity
            className="mt-4 bg-green-50 w-[104px] rounded-[20px] p-2"
            activeOpacity={0.7}
            disabled={true}
          >
            <Text
              className="text-white text-sm text-center"
              style={styles.montserratBold}
            >
              Verified
            </Text>
          </TouchableOpacity>
        ) : loading ? (
          <TouchableOpacity
            className="mt-4 bg-green w-[104px] rounded-[20px] p-2"
            activeOpacity={0.7}
            onPress={() => handleApproveRegistration(true)}
          >
            <Loading color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="mt-4 bg-green w-[104px] rounded-[20px] p-2"
            activeOpacity={0.7}
            onPress={() => handleApproveRegistration(true)}
        >
            <Text
              className="text-white text-sm text-center"
              style={styles.montserratMedium}
            >
              Verify
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-col items-start">
        {prop.driver.is_admin_approved ? (
          <TouchableOpacity
            className="mt-4 bg-green-50 w-[104px] rounded-[20px] p-2"
            activeOpacity={0.7}
            disabled={true}
          >
            <Text
              className="text-white text-sm text-center"
              style={styles.montserratBold}
            >
              Rejected
            </Text>
          </TouchableOpacity>
        ) : loading ? (
          <TouchableOpacity
            className="mt-4 bg-green w-[104px] rounded-[20px] p-2"
            activeOpacity={0.7}
            onPress={() => handleApproveRegistration(false)}
          >
            <Loading color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="mt-4 bg-green w-[104px] rounded-[20px] p-2"
            activeOpacity={0.7}
            onPress={() => handleApproveRegistration(false)}
          >
            <Text
              className="text-white text-sm text-center"
              style={styles.montserratMedium}
            >
              Reject
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default DriverRegisCard