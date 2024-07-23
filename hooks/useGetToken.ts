import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export default function useGetToken() {
  const [token, setUserToken] = useState<string | undefined>(undefined);

  // Retrieve token when the component mounts
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token !== null) {
          console.log("User token read: ", token);
          setUserToken(token);
        }
      } catch (e) {
        console.log("Error reading JWT", e);
      }
    };

    getToken();
  }, []);

  const checkAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("to index");
        router.replace("/");
      }
      console.log("user token exists: ", token);
    } catch (error) {
      console.error("Error checking stored token:", error);
    }
  };

  return { token, checkAuthToken };
}
