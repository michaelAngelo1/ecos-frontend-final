import { ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./../config/Fonts";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import Snackbar from "@/components/Snackbar";
import { authInstance, userDetailInstance } from "../config/axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SignInProps } from "../config/Interface";
import ModalLoading from "@/components/ModalLoading";
import PasswordField from "@/components/PasswordField";

const SignIn: React.FC<SignInProps> = () => {
  const [form, setForm] = useState<SignInProps>({
    email: "",
    password: "",
  });

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      console.log("TOKEN HERE: ", token);
      if (token) {
        setIsAuthenticated(true);
        console.log("masuk sini dong");
        const isAdminApproved = await checkAdminVerification(token);
        if (isAdminApproved === false) {
          router.replace("/pendingApproval");
        } else {
          router.replace("/home");
        }
      }
    } catch (error) {
      console.error("Error checking stored token:", error);
    }
  };

  useEffect(() => {
    checkAuthToken().catch((error) =>
      console.error("Error in checkAuthToken useEffect:", error)
    );
  }, []);

  const checkAdminVerification = async (
    userToken: string
  ): Promise<boolean> => {
    try {
      const response = await userDetailInstance(userToken).get("");
      return response.data.response.user_detail.is_admin_approved;
    } catch (e) {
      console.log("Error checking admin verification: ", e);
      return false;
    }
  };

  const [loading, setLoading] = useState<boolean>(false);
  const handleSignIn = async ({ email, password }: SignInProps) => {
    setLoading(true);
    try {
      const response = await authInstance.post("", {
        email,
        password,
      });
      console.log(response);
      if (response && response.data) {
        await storeJWT(response.data["access_token"]);
        setIsAuthenticated(true);
        const isAdminApproved = await checkAdminVerification(
          response.data["access_token"]
        );
        console.log("is admin approved: ", isAdminApproved);
        if (!isAdminApproved) {
          router.replace("/pendingApproval");
          return;
        }
        console.log("is Admin approved: ", isAdminApproved);
        router.replace("/home");
      } else {
        console.log("NO RESPONSE");
        throw new Error("No response data");
      }
    } catch (error: any) {
      console.log("Error during sign in", error.response);
      // Show Snackbar on error
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const storeJWT = async (token: string) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      console.log("Successful store JWT");
    } catch (e) {
      console.log("Failed to store JWT: ", e);
    }
  };

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      {loading ? <ModalLoading /> : null}
      <ScrollView>
        <View className="flex flex-col min-h-[100vh] justify-center items-center px-4">
          <Text
            className="text-4xl text-green"
            style={styles.montserratRegular}
          >
            Sign in to ECOS
          </Text>
          <FormField
            title="Enter your email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-4"
            keyboardType="email-address"
          />
          <PasswordField
            title="Enter your password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mt-3"
          />

          <CustomButton
            actionText="Log in"
            bgColor="bg-green"
            textColor="text-white"
            handlePress={() => {
              handleSignIn({
                email: form.email,
                password: form.password,
              }).catch((error) =>
                console.error("Error during handleSignIn:", error)
              );
            }}
          />
          <View className="justify-center pt-2 flex-row gap-2">
            <Text
              className="text-sm text-green"
              style={styles.montserratRegular}
            >
              Forgot password?
            </Text>
            <Link
              href="/forgotPassword"
              className="text-sm text-green"
              style={styles.montserratMedium}
            >
              Click here
            </Link>
          </View>
          <View className="justify-center pt-2 flex-row gap-2">
            <Text
              className="text-sm text-green"
              style={styles.montserratRegular}
            >
              Don't have an account?
            </Text>
            <Link
              href="/role"
              className="text-sm text-green"
              style={styles.montserratMedium}
            >
              Sign up
            </Link>
          </View>

          {snackbarVisible && (
            <Snackbar
              message="Sign in failed. Check your username and password."
              setVisible={setSnackbarVisible}
              duration={3000}
              bgColor="bg-red-900"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
