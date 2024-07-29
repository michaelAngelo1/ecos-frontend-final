import { useState } from "react";

export default function useErrorMessage() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [error, setError] = useState<string>("");

  function handleErrorMessage(message: string) {
    setSnackbarVisible(true);
    setError(message);
  }
  return {
    snackbarVisible,
    setSnackbarVisible,
    error,
    handleErrorMessage
  };
}
