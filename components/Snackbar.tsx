import { styles } from "@/app/config/Fonts";
import React, { useState, useEffect } from "react";
import { Animated, Dimensions, Text } from "react-native";

interface SnackbarProps {
  message: string;
  setVisible: (isVisible: boolean) => void;
  duration?: number;
  onPressAction?: () => void;
  bgColor: string;
}

const Snackbar: React.FC<SnackbarProps> = ({
  bgColor,
  message,
  setVisible,
  duration = 3000,
  onPressAction,
}) => {
  const [opacity] = useState(new Animated.Value(0));
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    if (message) {
      fadeIn();
      const timeout = setTimeout(() => fadeOut(), duration);
      return () => clearTimeout(timeout);
    }
  }, [message, duration]);

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setVisible(false);
  };

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: 0,
          bottom: 0,
          width: screenWidth,
          height: 80,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10, // setting zIndex
          opacity: opacity,
        },
      ]}
      className={` absolute left-0 bottom-0 w-screen h-[80px] justify-center items-center ${bgColor} ${opacity}`}
    >
      <Text
        className="text-base text-white p-2"
        style={styles.montserratSemiBold}
      >
        {message}
      </Text>
    </Animated.View>
  );
};

export default Snackbar;
