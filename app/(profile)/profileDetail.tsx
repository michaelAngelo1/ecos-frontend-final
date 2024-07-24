import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../config/Fonts";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { Image } from "expo-image";
import useGetUserData from "@/hooks/useGetUserData";
import useGetToken from "@/hooks/useGetToken";
import {
  uploadUserProfileInstance,
  userDetailInstance,
} from "../config/axiosConfig";
import ModalLoading from "@/components/ModalLoading";
import Snackbar from "@/components/Snackbar";
import * as ImagePicker from "expo-image-picker";

interface ProfileDetailProps {
  name: string;
  phone: string;
  email: string;
  street: string;
  profile_image?: string;
}

const ProfileDetail = () => {
  const [form, setForm] = useState<ProfileDetailProps>({
    name: "",
    phone: "",
    email: "",
    street: "",
  });
  const { token } = useGetToken();
  const { user, loading } = useGetUserData(token);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [error, setError] = useState<string>("");
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [imageFile, setImageFile] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.user_detail.name || "",
        phone: user.user_detail.phone || "",
        email: user.email || "",
        street: user.user_detail.street || "",
      });
      const imageUrl = new URL(
        `http://ecos.joheee.com:4050/public/user/${user.user_detail.profile_image}`
      ).toString();
      setImage(imageUrl);
    }
  }, [user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImageFile(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  async function handleUpdate() {
    try {
      setUpdateLoading(true);
      const phoneNumberRegex = /^\d+$/;
      if (!phoneNumberRegex.test(form.phone)) {
        setError("Phone number must be numeric");
        setSnackbarVisible(true);
        return;
      }
      
      const { email, ...userDetails } = form;
      
      if (imageFile) {
        const formData = new FormData();
        formData.append("profile_image_file", {
          uri: imageFile!.uri,
          name: imageFile!.fileName,
          type: imageFile!.mimeType,
        });
        const response = await uploadUserProfileInstance().post("", formData);
        const imageName = response.data;
        userDetails.profile_image = imageName;
      }

      await userDetailInstance(token!).patch("", {
        ...userDetails,
      });
      router.push("(tabs)/profile");
    } catch (error: any) {
      const errorMessage = error.response.status;
      if (errorMessage === 405) setError("Phone number is already used!");
      setSnackbarVisible(true);
    } finally {
      setUpdateLoading(false);
    }
  }

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      {loading || updateLoading ? <ModalLoading /> : null}
      {snackbarVisible && (
        <Snackbar
          message={error}
          setVisible={setSnackbarVisible}
          duration={3000}
          bgColor="bg-red-900"
        />
      )}
      <ScrollView>
        <View className="flex flex-col justify-center items-center px-4 mt-5">
          {image ? (
            <View className="flex-col gap-2 items-center">
              <Image
                source={{ uri: image }}
                className="w-32 h-32 rounded-full"
              />
              <Pressable
                onPress={pickImage}
                className="bg-white flex items-center justify-center"
              >
                <Text
                  className="text-sm text-green p-2"
                  style={styles.montserratBold}
                >
                  Not sure? Add another
                </Text>
              </Pressable>
            </View>
          ) : (
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
          )}

          <Text className="text-2xl mt-3" style={styles.montserratSemiBold}>
            {user?.user_detail.name}
          </Text>
          <Text className="text-lg" style={styles.montserratMedium}>
            {user?.email}
          </Text>

          <FormField
            title=""
            value={form.name}
            handleChangeText={(e: string) => setForm({ ...form, name: e })}
            otherStyles="mt-3"
            keyboardType="default"
          />
          <FormField
            title=""
            value={form.phone}
            handleChangeText={(e: string) => setForm({ ...form, phone: e })}
            otherStyles="mt-3"
            keyboardType="phone-pad"
          />
          <FormField
            title=""
            value={form.street}
            handleChangeText={(e: string) => setForm({ ...form, street: e })}
            otherStyles="mt-3"
            keyboardType="default"
          />
          <CustomButton
            actionText="Update"
            textColor="text-white"
            bgColor="bg-green"
            handlePress={handleUpdate}
          />
          <CustomButton
            actionText="Back"
            textColor="text-white"
            bgColor="bg-green"
            handlePress={() => {
              router.push("(tabs)/profile");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileDetail;
