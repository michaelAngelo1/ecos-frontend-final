import { useState } from "react";

export default function useRegisterPaymentInfo() {
  const [name, setName] = useState<string>("");
  const [account_number, set_account_number] = useState<string>("");
  return { name, setName, account_number, set_account_number };
}
