import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./../config/Fonts";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { SignUpCustomerProps } from "../config/Interface";
import {
  authInstance,
  customerDetailInstance,
  userDetailInstance,
} from "../config/axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import icons from "@/constants/icons";
import { Image } from "expo-image";
import ModalLoading from "@/components/ModalLoading";
import Snackbar from "@/components/Snackbar";
import PasswordField from "@/components/PasswordField";

const SignUpCustomer = () => {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    phoneNumber: "",
    pickUpAddress: "",
    password: "",
    grade: "",
    binusianId: "",
    parentsPhone: "",
  });

  let role = "CUSTOMER";
  const [termsConditions, setTermsConditions] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSignUpCustomer = async ({
    firstName,
    email,
    phoneNumber,
    pickUpAddress,
    grade,
    password,
    binusianId,
    parentsPhone,
  }: SignUpCustomerProps) => {
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

      let gradeInt = parseInt(grade);
      const response = await authInstance.patch("", {
        name: firstName,
        email: email,
        phone: phoneNumber,
        street: pickUpAddress,
        password: password,
        grade: gradeInt,
      });

      let token = response.data["access_token"];
      // update role
      await userDetailInstance(token).patch("", {
        role: role,
      });
      // get new token
      const res = await authInstance.post("", {
        email: email,
        password: form.password,
      });
      let newToken = res.data["access_token"];
      // create new customer detail
      await customerDetailInstance(newToken).post("", {
        binusian_id: binusianId,
        parent_phone: parentsPhone,
      });
      // store usertoken
      await AsyncStorage.setItem("userToken", newToken);
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
            as a User
          </Text>

          <FormField
            title="Full Name"
            value={form.firstName}
            handleChangeText={(e: string) => setForm({ ...form, firstName: e })}
            otherStyles="mt-3"
            keyboardType="full-name"
          />
          <FormField
            title="Email"
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
            keyboardType="phoneNumber"
          />
          <FormField
            title="Active parents' phone number"
            value={form.parentsPhone}
            handleChangeText={(e: string) =>
              setForm({ ...form, parentsPhone: e })
            }
            otherStyles="mt-3"
            keyboardType="phoneNumber"
          />
          <FormField
            title="Pick-up Address"
            value={form.pickUpAddress}
            handleChangeText={(e: string) =>
              setForm({ ...form, pickUpAddress: e })
            }
            otherStyles="mt-3"
            keyboardType="pickUpAddress"
          />
          <PasswordField
            title="Enter your password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mt-3"
          />
          <FormField
            title="Enter your Binusian ID"
            value={form.binusianId}
            handleChangeText={(e: string) =>
              setForm({ ...form, binusianId: e })
            }
            otherStyles="mt-3"
            keyboardType="grade"
          />
          <FormField
            title="Enter your grade"
            value={form.grade}
            handleChangeText={(e: string) => setForm({ ...form, grade: e })}
            otherStyles="mt-3"
            keyboardType="grade"
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
                binusianId: form.binusianId,
                parentsPhone: form.parentsPhone,
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

export default SignUpCustomer;
