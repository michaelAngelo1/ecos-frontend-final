import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./../config/Fonts";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { SignUpDriverProps } from "../config/Interface";
import { authInstance, userDetailInstance } from "../config/axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import icons from "@/constants/icons";
import { Image } from "expo-image";
import ModalLoading from "@/components/ModalLoading";
import Snackbar from "@/components/Snackbar";

const SignUpDriver = () => {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    phoneNumber: "",
    pickUpAddress: "",
    password: "",
    grade: "",
    binusianId: "",
  });
  const [termsConditions, setTermsConditions] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  let role = "DRIVER";
  // DUMMY TERMS & CONDITIONS STATE
  const handleSignUpCustomer = async ({
    firstName,
    email,
    phoneNumber,
    pickUpAddress,
    password,
    binusianId,
  }: SignUpDriverProps) => {
    try {
      setLoading(true);
      const phoneNumberRegex = /^\d+$/;
      const binusianIdRegex = /^\d+$/;

      if (!phoneNumberRegex.test(phoneNumber)) {
        setError("Phone number must be numeric");
        setSnackbarVisible(true);
        setLoading(false);
        return;
      }

      if (!binusianIdRegex.test(binusianId)) {
        setError("Binusian ID must be numeric");
        setSnackbarVisible(true);
        setLoading(false);
        return;
      }

      if (!termsConditions) {
        setError("Check the terms and conditions!");
        setSnackbarVisible(true);
        setLoading(false);
        return;
      }

      console.log(firstName, phoneNumber);
      console.log(typeof firstName, typeof phoneNumber);
      const response = await authInstance.patch("", {
        email: email,
        name: firstName,
        phone: phoneNumber,
        street: pickUpAddress,
        password: password,
        binusian_id: binusianId,
        grade: 0,
      });

      let token = response.data["access_token"];
      await userDetailInstance(token).patch("", {
        role,
      });
      await authInstance.post("", {
        email: email,
        password: form.password,
      });
      await AsyncStorage.setItem("userToken", response.data["access_token"]);
      router.push("/addProfPic");
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      if (Array.isArray(errorMessage)) {
        setError(errorMessage[0]);
      } else {
        setError(errorMessage);
      }
      console.log(errorMessage);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      {loading ? <ModalLoading /> : null}
      {snackbarVisible && (
        <Snackbar
          message={error}
          setVisible={setSnackbarVisible}
          duration={3000}
          bgColor="bg-red-900"
        />
      )}
      <ScrollView>
        <View className="flex flex-col min-h-[100vh] justify-center items-center px-4">
          <Text className="text-4xl text-green" style={styles.montserratMedium}>
            Sign up to ECOS
          </Text>
          <Text
            className="text-2xl text-green"
            style={styles.montserratRegular}
          >
            as a Partner
          </Text>

          <FormField
            title="Enter Fullname"
            value={form.firstName}
            handleChangeText={(e: string) => setForm({ ...form, firstName: e })}
            otherStyles="mt-3"
            keyboardType="full-name"
          />
          <FormField
            title="Enter email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-3"
            keyboardType="email-address"
          />
          <FormField
            title="Active phone number"
            value={form.phoneNumber}
            handleChangeText={(e: string) =>
              setForm({ ...form, phoneNumber: e })
            }
            otherStyles="mt-3"
            keyboardType="numeric"
          />
          <FormField
            title="Enter your address"
            value={form.pickUpAddress}
            handleChangeText={(e: string) =>
              setForm({ ...form, pickUpAddress: e })
            }
            otherStyles="mt-3"
            keyboardType="pickUpAddress"
          />
          <FormField
            title="Enter your child's Binusian ID"
            value={form.binusianId}
            handleChangeText={(e: string) =>
              setForm({ ...form, binusianId: e })
            }
            otherStyles="mt-3"
            keyboardType="grade"
          />
          <FormField
            title="Enter your password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mt-3"
            keyboardType="password"
          />
          <View className="flex-row gap-1 items-center mt-1">
            <Pressable onPress={() => setTermsConditions(!termsConditions)}>
              {termsConditions ? (
                <Image className="w-6 h-6" source={icons.verified_icon} />
              ) : (
                <View className="w-6 h-6 rounded-full border border-1 border-green"></View>
              )}
            </Pressable>
            <Text
              className="text-sm text-green"
              style={styles.montserratRegular}
            >
              I agree to terms and conditions
            </Text>
          </View>
          <CustomButton
            actionText="Next up"
            bgColor="bg-green"
            textColor="text-white"
            handlePress={() =>
              handleSignUpCustomer({
                firstName: form.firstName,
                email: form.email,
                phoneNumber: form.phoneNumber,
                pickUpAddress: form.pickUpAddress,
                grade: form.grade,
                password: form.password,
                binusianId: "2413",
                parentsPhone: "3824",
              })
            }
          />

          <View className="justify-center pt-2 flex-row gap-2">
            <Text
              className="text-sm text-green"
              style={styles.montserratRegular}
            >
              Already have an account?
            </Text>
            <Link
              href="/signIn"
              className="text-sm text-green"
              style={styles.montserratMedium}
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpDriver;
