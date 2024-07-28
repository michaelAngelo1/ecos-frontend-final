import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../config/Fonts";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import Snackbar from "@/components/Snackbar";
import { useState } from "react";
import ModalLoading from "@/components/ModalLoading";
import React from "react";
import useGetToken from "@/hooks/useGetToken";
import useGetUserData from "@/hooks/useGetUserData";
import useChangePassword from "@/hooks/useChangePassword";
import { authInstance } from "../config/axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PasswordField from "@/components/PasswordField";

export default function changePassword() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { token } = useGetToken();
  const { user } = useGetUserData(token);
  const { lastPass, setLastPass, password, setPassword, conPas, setConPas } =
    useChangePassword();

  function handleErrorMessage(message: string) {
    setSnackbarVisible(true);
    setError(message);
  }
  async function handleChangePassword() {
    setLoading(true);
    try {
      if (lastPass === "" || password === "" || conPas === "") {
        handleErrorMessage("all field must be filled!");
        return;
      }

      if (password !== conPas) {
        handleErrorMessage("new password and confirm password is different!");
        return;
      }

      await authInstance.post("", {
        email: user?.email,
        password: lastPass,
      });
      const updateUser = await authInstance.put("", {
        user_id: user?.user_id,
        password,
      });
      console.log(updateUser.data);
      const response = await authInstance.post("", {
        email: user?.email,
        password,
      });
      await AsyncStorage.setItem("userToken", response.data["access_token"]);
      router.replace("(tabs)/profile");
    } catch (error) {
      handleErrorMessage("last password is invalid!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      {loading ? <ModalLoading /> : null}
      <ScrollView>
        <View className="flex flex-col min-h-[100vh] justify-center items-center px-4">
          <Text
            className="text-4xl text-green"
            style={styles.montserratRegular}
          >
            Change Password
          </Text>
          <PasswordField
            title="Enter your last password"
            value={lastPass}
            handleChangeText={(e) => setLastPass(e)}
            otherStyles="mt-3"
          />
          <PasswordField
            title="Enter your new password"
            value={password}
            handleChangeText={(e) => setPassword(e)}
            otherStyles="mt-3"
          />
          <PasswordField
            title="Confirm your new password"
            value={conPas}
            handleChangeText={(e) => setConPas(e)}
            otherStyles="mt-3"
          />
          <CustomButton
            actionText="Update"
            bgColor="bg-green"
            textColor="text-white"
            handlePress={handleChangePassword}
          />
          <View className="justify-center pt-2 flex-row gap-2">
            <Text
              className="text-sm text-green"
              style={styles.montserratRegular}
            >
              Abort change password?
            </Text>
            <Link
              href="(tabs)/profile"
              className="text-sm text-green"
              style={styles.montserratMedium}
            >
              Back here
            </Link>
          </View>

          {snackbarVisible && (
            <Snackbar
              message={error}
              setVisible={setSnackbarVisible}
              duration={3000}
              bgColor="bg-red-900"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
