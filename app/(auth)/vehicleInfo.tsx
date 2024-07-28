import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { styles } from "../config/Fonts";
import * as ImagePicker from "expo-image-picker";
import Snackbar from "@/components/Snackbar";
import {
  driverDetailInstance,
  uploadImageVehicleInstance,
} from "../config/axiosConfig";
import { Image } from "expo-image";
import useGetToken from "@/hooks/useGetToken";
import ModalLoading from "@/components/ModalLoading";

const VehicleInfo = () => {
  const [image, setImage] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { token } = useGetToken();
  const [imageFile, setImageFile] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  const [form, setForm] = useState({
    vehicleModel: "",
    vehicleCategory: "",
    seatCapacity: "",
    numberPlate: "",
    yearReleased: "",
  });

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageFile(result.assets[0]);
    }
  };

  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmitVehicleInfo = async (
    vehicleCategory: string,
    vehicleModel: string,
    seatCapacity: string,
    numberPlate: string,
    yearReleased: string,
    image: ImagePicker.ImagePickerAsset
  ) => {
    setLoading(true);
    try {
      console.log("STRING SEAT CAPACIY: ", seatCapacity);
      const integerCapacity = parseInt(seatCapacity);
      if (
        vehicleModel == "" ||
        seatCapacity == "" ||
        numberPlate == "" ||
        yearReleased == "" ||
        parseInt(yearReleased) < 2014
      ) {
        setSnackbarVisible(true);
        return;
      }
      console.log("TIPE IMAGE: ", typeof image);
      console.log("SEAT CAPACITY: ", integerCapacity);
      // mulai upload gambar
      if (imageFile) {
        const formData = new FormData();
        formData.append("vehicle_image_file", {
          uri: imageFile!.uri,
          name: imageFile!.fileName,
          type: imageFile!.mimeType,
        });
        const response = await uploadImageVehicleInstance().post("", formData);
        const imageName = response.data;
        console.log("IMAGE NAME: ", imageName);
        await driverDetailInstance(token!)
          .post("", {
            vehicle_image: imageName,
            vehicle_model: vehicleModel,
            vehicle_category: vehicleCategory,
            vehicle_capacity: integerCapacity,
            vehicle_number_plate: numberPlate,
          })
          .then(() => {
            console.log("VEHICLE CAPACITY: ", integerCapacity);
            router.push("/pendingApproval");
          })
          .catch((e) => {
            console.log("error update AUTH driver detaiL: ", e.response);
          });
      }
    } catch (e) {
      console.log("error vehicle info: ", e);
    } finally {
      setLoading(false);
    }
  };

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
          {image ? (
            <>
              <Image source={{ uri: image }} className="w-36 h-36" />
              <View className="flex-row gap-1 w-screen px-4 mt-2">
                <Text
                  className="text-green text-sm text-center pt-2"
                  style={styles.montserratRegular}
                >
                  Not sure about the picture?
                </Text>
                <Pressable onPress={pickImage}>
                  <Text
                    className="text-sm text-green p-2 border-2 border-green rounded-md"
                    style={styles.montserratRegular}
                  >
                    Choose another
                  </Text>
                </Pressable>
              </View>
            </>
          ) : (
            <>
              <Pressable onPress={pickImage}>
                <Text
                  className="text-sm text-green p-2 border-2 border-green rounded-md"
                  style={styles.montserratRegular}
                >
                  Upload car picture
                </Text>
              </Pressable>
            </>
          )}

          <FormField
            title="Vehicle Model (ex: Toyota Innova)"
            value={form.vehicleModel}
            handleChangeText={(e: string) =>
              setForm({ ...form, vehicleModel: e })
            }
            otherStyles="mt-3"
            keyboardType="vehicle-model"
          />
          <FormField
            title="Vehicle Category (ex: SUV, MPV, ..)"
            value={form.vehicleCategory}
            handleChangeText={(e: string) =>
              setForm({ ...form, vehicleCategory: e })
            }
            otherStyles="mt-3"
            keyboardType="vehicle-model"
          />
          <FormField
            title="Seat Capacity (excl. your own children)"
            value={form.seatCapacity}
            handleChangeText={(e: string) =>
              setForm({ ...form, seatCapacity: e })
            }
            otherStyles="mt-3"
            keyboardType="seat-capacity"
          />
          <FormField
            title="Vehicle Release Year"
            value={form.yearReleased}
            handleChangeText={(e: string) =>
              setForm({ ...form, yearReleased: e })
            }
            otherStyles="mt-3"
            keyboardType="year-released"
          />
          <FormField
            title="Number Plate"
            value={form.numberPlate}
            handleChangeText={(e: string) =>
              setForm({ ...form, numberPlate: e })
            }
            otherStyles="mt-3"
            keyboardType="numberPlate"
          />

          <CustomButton
            actionText="Submit"
            bgColor="bg-green"
            textColor="text-white"
            handlePress={() =>
              handleSubmitVehicleInfo(
                form.vehicleCategory,
                form.vehicleModel,
                form.seatCapacity,
                form.numberPlate,
                form.yearReleased,
                imageFile!
              )
            }
          />

          <View className="justify-center pt-2 flex-row gap-2"></View>
          {snackbarVisible && (
            <Snackbar
              message="Please fill your vehicle information. Make sure your vehicle release year is >= 2014" // Update message if needed
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

export default VehicleInfo;
