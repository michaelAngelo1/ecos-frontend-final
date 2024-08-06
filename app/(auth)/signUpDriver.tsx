import { Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./../config/Fonts";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router, useLocalSearchParams } from "expo-router";
import { SignUpDriverProps } from "../config/Interface";
import { authInstance, userDetailInstance } from "../config/axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import icons from "@/constants/icons";
import { Image } from "expo-image";
import ModalLoading from "@/components/ModalLoading";
import Snackbar from "@/components/Snackbar";
import PasswordField from "@/components/PasswordField";
import TermsAndConditionsModal from "@/components/TermsAndConditionsModal";
import useErrorMessage from "@/hooks/useErrorMessage";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [termsModal, settermsModal] = useState(false);
  const { error, handleErrorMessage, setSnackbarVisible, snackbarVisible } =
    useErrorMessage();

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
        handleErrorMessage("Phone number must be numeric!");
        return;
      }

      if (!binusianIdRegex.test(binusianId)) {
        handleErrorMessage("Binusian ID must be numeric!");
        return;
      }

      if (!termsConditions) {
        handleErrorMessage("Check the terms and conditions!");
        return;
      }

      // register driver
      const firstLogin = await authInstance.patch("", {
        email: email,
        name: firstName,
        phone: phoneNumber,
        street: preciseAddress,
        password: password,
        binusian_id: binusianId,
        grade: 0,
      });

      // gain access token for update role
      let token = firstLogin.data["access_token"];
      await userDetailInstance(token).patch("", {
        role,
      });

      // gain latest update token with the updated role
      let secondLogin = await authInstance.post("", {
        email: email,
        password: form.password,
      });

      let latestToken = secondLogin.data["access_token"];
      // store the latest token
      await AsyncStorage.setItem("userToken", latestToken);
      router.push("/addProfPic");
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      if (Array.isArray(errorMessage)) {
        handleErrorMessage(errorMessage[0]);
      } else {
        handleErrorMessage(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const { preciseAddress } = useLocalSearchParams();

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      {loading ? <ModalLoading /> : null}
      <TermsAndConditionsModal
        onClose={() => settermsModal(false)}
        visible={termsModal}
        onConfirm={() => settermsModal(false)}
      />
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

          <TouchableOpacity 
            className="w-full p-3 bg-white px-4 rounded-lg mt-3 items-start justify-center border-2 border-green"
            onPress={() => router.replace('/pinpointAddress')}
            activeOpacity={0.6}
          >
            {
              preciseAddress ?
                <Text
                  className=" text-green text-base opacity-80"
                  style={styles.montserratSemiBold}
                >{preciseAddress}</Text>
              :
                <Text
                  className=" text-green text-base opacity-80"
                  style={styles.montserratSemiBold}
                >Do this first. Press to enter accurate address.</Text>
            }
          </TouchableOpacity>
          <FormField
            title="Fullname"
            value={form.firstName}
            handleChangeText={(e: string) => setForm({ ...form, firstName: e })}
            otherStyles="mt-3"
            keyboardType="full-name"
          />
          <FormField
            title="email"
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
          {/* <FormField
            title="your address"
            value={form.pickUpAddress}
            handleChangeText={(e: string) =>
              setForm({ ...form, pickUpAddress: e })
            }
            otherStyles="mt-3"
            keyboardType="pickUpAddress"
          /> */}
          {/* New Address Pinpoint */}
          <FormField
            title="your child's Binusian ID"
            value={form.binusianId}
            handleChangeText={(e: string) =>
              setForm({ ...form, binusianId: e })
            }
            otherStyles="mt-3"
            keyboardType="grade"
          />
          <PasswordField
            title="your password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mt-3"
          />
          <View className="flex-row gap-1 items-center mt-1">
            <Pressable
              onPress={() => {
                settermsModal(!termsConditions);
                setTermsConditions(!termsConditions);
              }}
            >
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
