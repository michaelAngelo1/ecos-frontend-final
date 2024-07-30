import { ActivityIndicator, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
} from "react-native";
import CustomButton from "@/components/CustomButton";
import { styles } from "../config/Fonts";
import { router, useLocalSearchParams } from "expo-router";
import Snackbar from "@/components/Snackbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  paymentHeaderInstance,
  uploadPaymentHeaderImageInstance,
} from "../config/axiosConfig";

const paymentProcess = () => {
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    console.log("UPLOADED IMAGE: ", result.assets![0]);
    if (!result.canceled) {
      setImageFile(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  const getToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken !== null) {
        console.log("User token read: ", userToken);
        return userToken;
      }
    } catch (e) {
      console.log("Error reading JWT", e);
    }
  };

  const [loading, setLoading] = useState(false);
  const { customer_order_id } = useLocalSearchParams();
  const uploadImage = async () => {
    // console.log('image uploaded');
    // setLoading(true);
    // await new Promise(resolve => setTimeout(resolve, 2400));
    // setLoading(false);
    // await new Promise(resolve => setTimeout(resolve, 400));
    // setSnackbarVisible(true);
    try {
      let userToken = await getToken();

      if (imageFile) {
        const formData = new FormData();
        formData.append("payment_proof_image", {
          uri: imageFile!.uri,
          name: imageFile!.fileName,
          type: imageFile!.mimeType,
        });
        const response = await uploadPaymentHeaderImageInstance().post(
          "",
          formData
        );
        const payment_proof_image = response.data;
        const newPaymentHeader = await paymentHeaderInstance(userToken!)
          .post("", {
            customer_order_id,
            payment_proof_image,
            payment_total: 1000000, 
          })
          .then((res) => {
            console.log('CUSTOMER PAYMENT ID: ', res.data.response.customer_payment_id);
            router.replace({
              pathname: "/pendingPaymentVerif",
              params: {
                customer_order_id: customer_order_id,
                customer_payment_id: res.data.response.customer_payment_id
              },
            });
          });
      }
    } catch (e) {
      console.log("error upload image", e);
    }
    // router.push("/pendingPaymentVerif");
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const libraryStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (libraryStatus.status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }

        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus.status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <Text
        className="text-2xl text-black ml-4 mt-14"
        style={styles.montserratBold}
      >
        Make a payment
      </Text>
      <ScrollView>
        <View className="flex flex-col min-h-[93vh] justify-center items-center px-4">
          <Text
            className="text-base text-green text-center"
            style={styles.montserratRegular}
          >
            We will immediately process your request for monthly subscription
            Rp1.200.000/month to ECOS partner Pak Budi Santoso
          </Text>
          <Text
            className="text-base text-green text-center mt-3"
            style={styles.montserratRegular}
          >
            Please transfer to 527190586 a.n Michael Binus. Upload your payment
            proof here.
          </Text>
          {image ? (
            <>
              <View className="flex-col gap-2 items-center">
                <Image source={{ uri: image }} className="w-32 h-32" />
                {/* <Pressable onPress={pickImage} className="bg-white flex items-center justify-center">
                  <Text className='text-sm text-green p-2' style={styles.montserratBold}>Not sure? Add another</Text>
                </Pressable> */}
              </View>
            </>
          ) : (
            <>
              <Pressable
                onPress={pickImage}
                className="w-32 h-32 bg-white flex items-center justify-center"
              >
                <Text
                  className="text-5xl text-green"
                  style={styles.montserratBold}
                >
                  +
                </Text>
              </Pressable>
            </>
          )}

          {loading ? (
            <ActivityIndicator
              className="mt-3 p-1"
              size="large"
              color="green"
            />
          ) : (
            <CustomButton
              actionText="Upload proof"
              bgColor="bg-green"
              textColor="text-white"
              handlePress={() => uploadImage()}
            />
          )}
          {/* <CustomButton
            actionText="Next up"
            bgColor='bg-white'
            textColor='text-green'
            handlePress={() => 
              router.push('/pendingPaymentVerif')
            }
          /> */}
          {snackbarVisible && (
            <Snackbar
              message="Successfully uploaded payment proof" // Update message if needed
              setVisible={setSnackbarVisible} // Pass the function to update visibility
              duration={3000}
              bgColor="bg-blue"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default paymentProcess;
