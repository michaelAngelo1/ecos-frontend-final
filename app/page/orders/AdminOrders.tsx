import {
  adminTimeBlockInstance,
  driverOrderHeaderByIdInstance,
} from "@/app/config/axiosConfig";
import { styles } from "@/app/config/Fonts";
import CustomButton from "@/components/CustomButton";
import DriverRegisCard from "@/components/DriverRegisCard";
import Snackbar from "@/components/Snackbar";
import useGetAllDriverRequests from "@/hooks/useGetAllDriverRequests";
import useGetToken from "@/hooks/useGetToken";
import { useState } from "react";
import { Modal, ScrollView, Text, TextInput, View } from "react-native";
import DatePicker from "react-native-modern-datepicker";

export default function AdminOrders() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [startDateVisible, setStartDateVisible] = useState(false);
  const [endDateVisible, setEndDateVisible] = useState(false);
  const [startConfirmButton, setStartConfirmButton] = useState(false);
  const [endConfirmButton, setEndConfirmButton] = useState(false);
  const [successOrderwave, setSuccessOrderwave] = useState<boolean>();
  const [snackbarFailed, setSnackbarFailed] = useState(false);

  // custom hooks
  const { token } = useGetToken();
  const allDriver = useGetAllDriverRequests(token);

  function convertDateToIso(dateValue: string): Date {
    const formattedDateString = dateValue.replace(/\//g, "-");
    return new Date(formattedDateString);
  }

  const handleSubmitOrderWaveDate = async () => {
    const start_date: Date = convertDateToIso(startDate);
    const end_date: Date = convertDateToIso(endDate);

    console.log(start_date, end_date);

    try {
      const response = await adminTimeBlockInstance(token!).post("", {
        start_date,
        end_date,
      });
      console.log("response submit date: ", response.data.response);
      console.log("successfully created order wave");

      setSuccessOrderwave(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSuccessOrderwave(false);
    } catch (e: any) {
      console.log("error submiting order wave date", e.response);
      setSnackbarFailed(true);
    }
  };

  // ADMIN APPROVE DRIVER REGISTRATION
  const handleAdminApproveDriverRegistration = async (orderId: string) => {
    try {
      const response = await driverOrderHeaderByIdInstance(
        token!,
        orderId
      ).patch("", {
        is_admin_approved: true,
      });
      console.log("admin approve driver registration: ", response.data);
    } catch (e: any) {
      console.log("error approve driver registration: ", e.response);
    }
  };

  return (
    <>
      <View className="flex-row gap-1 mt-4 ml-5 mb-4">
        <Text className="text-2xl text-black" style={styles.montserratBold}>
          Orders
        </Text>
      </View>
      <ScrollView>
        <View className="flex-col gap-1 px-4">
          <Text className="text-base" style={styles.montserratBold}>
            Set order wave
          </Text>
          <Text className="mb-3" style={styles.montserratMedium}>
            Set an order wave period where ECOS partners can register as
            drivers.
          </Text>
          <Text style={styles.montserratMedium}>Set start order wave date</Text>
          <TextInput
            className="w-full h-14 bg-white px-3"
            style={styles.montserratMedium}
            placeholder="Select Date"
            editable={true}
            value={startDate.toString()}
            onPress={() => setStartDateVisible(true)}
            showSoftInputOnFocus={false}
          />
          {startDateVisible && (
            <Modal
              animationType="fade"
              visible={startDateVisible}
              onRequestClose={() => setStartDateVisible(!startDateVisible)}
            >
              <View className="flex flex-col justify-center items-center w-full min-h-[100vh] px-4 bg-white">
                <DatePicker
                  onSelectedChange={(dateValue: string) => {
                    setStartDate(dateValue);
                    setStartConfirmButton(true);
                  }}
                />
                {startConfirmButton && (
                  <CustomButton
                    actionText="Confirm start date"
                    textColor="text-white"
                    bgColor="bg-green"
                    handlePress={() => {
                      setStartDateVisible(false);
                      setStartConfirmButton(false);
                    }}
                  />
                )}
              </View>
            </Modal>
          )}

          <Text style={styles.montserratMedium}>Set end order wave date</Text>
          <TextInput
            className="w-full h-14 bg-white px-3"
            style={styles.montserratMedium}
            placeholder="Select Date"
            editable={true}
            value={endDate.toString()}
            onPress={() => setEndDateVisible(true)}
            showSoftInputOnFocus={false}
          />
          {endDateVisible && (
            <Modal
              animationType="fade"
              visible={endDateVisible}
              onRequestClose={() => setEndDateVisible(!endDateVisible)}
            >
              <View className="flex flex-col justify-center items-center w-full min-h-[100vh] px-4 bg-white">
                <DatePicker
                  onSelectedChange={(dateValue: string) => {
                    setEndDate(dateValue);
                    setEndConfirmButton(true);
                  }}
                />
                {endConfirmButton && (
                  <CustomButton
                    actionText="Confirm end date"
                    textColor="text-white"
                    bgColor="bg-green"
                    handlePress={() => {
                      setEndDateVisible(false);
                      setEndConfirmButton(false);
                    }}
                  />
                )}
              </View>
            </Modal>
          )}
          <CustomButton
            actionText="Set order wave period"
            bgColor="bg-green"
            textColor="text-white"
            handlePress={() => {
              handleSubmitOrderWaveDate();
            }}
          />

          <Text className="text-base pt-3" style={styles.montserratBold}>
            Driver Registration Requests
          </Text>
          <Text className="text-sm" style={styles.montserratMedium}>
            Approve or disapprove ECOS partners registration as drivers.
          </Text>
          <ScrollView className="min-h-[200px] overflow-auto">
            {allDriver.driverRegistrationList.map((driverRegistration, i) => {
              return (
                <DriverRegisCard
                  key={i}
                  driver={driverRegistration}
                  refetch={allDriver.refetch}
                  handleAdminApproveDriverRegistration={
                    handleAdminApproveDriverRegistration
                  }
                />
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
      {successOrderwave && (
        <Snackbar
          message="Successfully created order wave"
          setVisible={() => true}
          duration={3000}
          bgColor="bg-blue"
        />
      )}
      {snackbarFailed && (
        <Snackbar
          message="Failed creating order wave."
          setVisible={() => true}
          duration={3000}
          bgColor="bg-red-900"
        />
      )}
    </>
  );
}
