import { ScrollView, Text, View } from "react-native";
import { styles } from "../../config/Fonts";
import { adminApprovalInstance } from "../../config/axiosConfig";
import useGetToken from "@/hooks/useGetToken";
import useGetUserData from "@/hooks/useGetUserData";
import useGetAllUsers from "@/hooks/useGetAllUsers";
import HomeUserCard from "@/components/HomeUserCard";

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
      <ScrollView>
        <View className="flex flex-col justify-start items-start px-4">
          <Text
            className="text-base ml-2 mb-1"
            style={styles.montserratSemiBold}
          >
            Users who need to be verified
          </Text>
          {customers.length > 0 ? (
            customers?.map((item, index) => (
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
                No users need to be verified
              </Text>
            </View>
          )}
          <Text
            className="text-base mt-10 ml-2 mb-1"
            style={styles.montserratSemiBold}
          >
            Partners who need to be verified
          </Text>
          {drivers.length > 0 ? (
            drivers?.map((item, index) => (
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
    </>
  );
}
