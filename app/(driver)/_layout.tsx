import React from "react";
import { Stack } from "expo-router";

const DriverLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="registerPaymentInfo"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <Stack>
        <Stack.Screen
          name="updatePaymentInfo"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default DriverLayout;
