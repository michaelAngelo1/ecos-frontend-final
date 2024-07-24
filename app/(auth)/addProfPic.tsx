import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { styles } from "../config/Fonts";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import {
  uploadUserProfileInstance,
  userDetailInstance,
} from "../config/axiosConfig";
import Snackbar from "@/components/Snackbar";
import useGetToken from "@/hooks/useGetToken";
import useGetUserData from "@/hooks/useGetUserData";

const AddProfPic = () => {
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const { token } = useGetToken();

  const { role } = useGetUserData(token);

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
      aspect: [1, 1],
      quality: 1,
    });

    console.log("UPLOADED IMAGE: ", result.assets![0]);
    if (!result.canceled) {
      setImageFile(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("profile_image_file", {
          uri: imageFile!.uri,
          name: imageFile!.fileName,
          type: imageFile!.mimeType,
        });
        const response = await uploadUserProfileInstance().post("", formData);
        const imageName = response.data;
        const updateUserDetail = await userDetailInstance(token!)
          .patch("", {
            profile_image: imageName,
          })
          .then(() => {
            console.log('role: ', role);
            if(role == 'CUSTOMER') {
              router.push('/pendingApproval');
            } else {
              router.push("/vehicleInfo");
            }
          });
      }
    } catch (e) {
      console.log("error upload image", e);
    }
  };

  const handleSkipForNow = () => {
    console.log("handle skip for now");
    console.log(role);
    if (role == "CUSTOMER") {
      router.push("/pendingApproval");
    } else if (role == "DRIVER") {
      console.log("router push vehicle info");
      router.push("/vehicleInfo");
    }
  };

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <ScrollView>
        <View className="flex flex-col min-h-[104vh] justify-center items-center px-4">
          <Text
            className="text-4xl text-green text-center"
            style={styles.montserratRegular}
          >
            Add a profile picture
          </Text>
          <Text
            className="text-xl text-green text-center"
            style={styles.montserratRegular}
          >
            Show us your best smile!
          </Text>
          {image ? (
            <>
              <View className="flex-col gap-2 items-center">
                <Image source={{ uri: image }} className="w-32 h-32" />
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

          <CustomButton
            actionText="Upload"
            bgColor="bg-green"
            textColor="text-white"
            handlePress={() => {
              uploadImage();
            }}
          />
          <CustomButton
            actionText="Skip for now"
            bgColor="bg-white"
            textColor="text-green"
            handlePress={handleSkipForNow}
          />
          {snackbarVisible && (
            <Snackbar
              message="Your account has been verified! Let's sign in" // Update message if needed
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

export default AddProfPic;
