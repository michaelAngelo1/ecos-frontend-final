import ModalLoading from "@/components/ModalLoading";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../config/Fonts";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import Snackbar from "@/components/Snackbar";
import { useState } from "react";
import useGetToken from "@/hooks/useGetToken";
import useErrorMessage from "@/hooks/useErrorMessage";
import { router } from "expo-router";
import { paymentInstance } from "../config/axiosConfig";
import usePaymentInfo from "@/hooks/usePaymentInfo";

export default function RegisterPaymentInfo() {
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useGetToken();
  const { name, setName, account_number, set_account_number } =
    usePaymentInfo();
  const { error, handleErrorMessage, setSnackbarVisible, snackbarVisible } =
    useErrorMessage();

  async function handlePayment() {
    setLoading(true);
    try {
      const numRegex = /^\d+$/;

      if (name === "" || account_number === "") {
        handleErrorMessage("All field must be filled!");
        return;
      }

      if (!numRegex.test(account_number)) {
        handleErrorMessage("Bank account number must be numeric!");
        return;
      }
      await paymentInstance(token!).post("", {
        name,
        account_number,
      });
      router.push("/pendingApproval");
    } catch (error) {
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
            className="text-4xl text-green text-center"
            style={styles.montserratRegular}
          >
            Vehicle Information
          </Text>

          <FormField
            title="Back Account Name"
            value={name}
            handleChangeText={setName}
            otherStyles="mt-3"
            keyboardType="vehicle-model"
          />
          <FormField
            title="Bank Account Number"
            value={account_number}
            handleChangeText={set_account_number}
            otherStyles="mt-3"
            keyboardType="vehicle-model"
          />

          <CustomButton
            actionText="Submit"
            bgColor="bg-green"
            textColor="text-white"
            handlePress={handlePayment}
          />

          <View className="justify-center pt-2 flex-row gap-2"></View>
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
