import { Modal, Text, View, ScrollView } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { styles } from "@/app/config/Fonts";

interface TermsAndConditionsModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const TermsAndConditionsModal = ({
  visible,
  onClose,
  onConfirm,
}: TermsAndConditionsModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white w-11/12 p-4 rounded-lg">
          <Text
            className="text-2xl text-green mb-4"
            style={styles.montserratRegular}
          >
            Terms and Conditions
          </Text>
          <ScrollView className="max-h-60 mb-4">
            <Text
              className="text-base text-gray-700"
              style={styles.montserratRegular}
            >
              Welcome to ECOS, a carpooling app designed to make your daily
              commute more sustainable and cost-effective. By using our
              services, you agree to the following terms and conditions:
              {"\n\n"}1. Acceptance of Terms: By accessing and using ECOS, you
              agree to comply with and be bound by these terms. If you do not
              agree with these terms, please do not use the app.
              {"\n\n"}2. User Conduct: You agree to use ECOS only for lawful
              purposes. You must not use the app to transmit any content that is
              illegal, harmful, or offensive.
              {"\n\n"}3. Registration and Account Security: You agree to provide
              accurate and complete information when creating an account. You
              are responsible for maintaining the confidentiality of your
              account and password.
              {"\n\n"}4. Ride Sharing: ECOS facilitates carpooling among users.
              As a rider, you agree to be punctual and courteous. As a driver,
              you agree to drive safely and follow all traffic laws.
              {"\n\n"}5. Payments: ECOS may facilitate payments between riders
              and drivers. You agree to pay the fare as specified in the app.
              Drivers agree to receive payments only through the app.
              {"\n\n"}6. Privacy: Your use of ECOS is subject to our Privacy
              Policy, which explains how we collect, use, and protect your
              personal information.
              {"\n\n"}7. Limitation of Liability: ECOS is not liable for any
              damages resulting from your use of the app, including but not
              limited to any personal injury or property damage that may occur
              during a ride.
              {"\n\n"}8. Termination: ECOS reserves the right to terminate or
              suspend your account at any time, without notice, for conduct that
              we believe violates these terms or is harmful to other users of
              the app.
              {"\n\n"}9. Changes to Terms: ECOS may modify these terms at any
              time. We will notify you of any changes by posting the new terms
              on the app. Your continued use of ECOS after the changes are
              posted will signify your acceptance of the new terms.
              {"\n\n"}10. Contact Us: If you have any questions about these
              terms, please contact us at support@ecosapp.com.
              {"\n\n"}Thank you for choosing ECOS. We hope you have a pleasant
              and safe ride!
            </Text>
            <View className="mt-4">
              <CustomButton
                actionText="Confirm"
                bgColor="bg-green"
                textColor="text-white"
                handlePress={onConfirm}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default TermsAndConditionsModal;
