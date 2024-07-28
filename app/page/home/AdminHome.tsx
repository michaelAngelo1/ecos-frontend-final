import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../config/Fonts";
import { adminApprovalInstance } from "../../config/axiosConfig";
import useGetToken from "@/hooks/useGetToken";
import useGetUserData from "@/hooks/useGetUserData";
import useGetAllUsers from "@/hooks/useGetAllUsers";
import HomeUserCard from "@/components/HomeUserCard";
import { router } from "expo-router";

export default function AdminHome() {
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
    <>
      <View className="flex-row gap-1 mt-4 ml-5 mb-4">
        <Text className="text-2xl text-black" style={styles.montserratRegular}>
          Welcome,{" "}
        </Text>
        <Text className="text-2xl text-black" style={styles.montserratBold}>
          {user?.user_detail.name.split(" ")[0]}
        </Text>
      </View>
        <View className="flex flex-col justify-center space-y-3 mx-4">
          
          <TouchableOpacity
            className='w-full h-40 items-center justify-center bg-green rounded-2xl p-3'
            activeOpacity={0.7}
            onPress={() => router.push('/usersVerification')}
          >
            <Text
              className="text-base ml-2 mb-1 text-white"
              style={styles.montserratSemiBold}
            >
              Verify users registration
            </Text>
            <Text
              className="text-xs ml-2 mb-1 text-white text-center"
              style={styles.montserratRegular}
            >
              New users will be displayed here. Admin needs to verify whether the user is a legitimate student of Binus School.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className='w-full h-40 items-center justify-center bg-blue rounded-2xl p-3'
            activeOpacity={0.7}
            onPress={() => router.push('/driversVerification')}
          >
            <Text
              className="text-base ml-2 mb-1 text-white"
              style={styles.montserratSemiBold}
            >
              Verify partners registration
            </Text>
            <Text
              className="text-xs ml-2 mb-1 text-white text-center"
              style={styles.montserratRegular}
            >
              New users will be displayed here. Admin needs to verify whether the user is a legitimate parents of student of Binus School.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className='w-full h-40 items-center justify-center bg-amber-900 rounded-2xl p-3'
            activeOpacity={0.7}
            onPress={() => router.push('/orderPaymentVerification')}
          >
            <Text
              className="text-base ml-2 mb-1 text-white"
              style={styles.montserratSemiBold}
            >
              Verify payment orders
            </Text>
            <Text
              className="text-xs ml-2 mb-1 text-white text-center"
              style={styles.montserratRegular}
            >
              Unapproved orders will be displayed here. Admin needs to approve or reject user's order request of a partner by verifying the payment proof.
            </Text>
          </TouchableOpacity>
          
          
          
        </View>
    </>
  );
}
