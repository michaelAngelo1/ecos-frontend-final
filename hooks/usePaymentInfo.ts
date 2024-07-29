import { useEffect, useState } from "react";
import useGetToken from "./useGetToken";
import { paymentInstance } from "@/app/config/axiosConfig";

interface PaymentInterface {
  payment_id: string;
  name: string;
  account_number: string;
  created_at: string;
  updated_at: string;
}

export default function usePaymentInfo() {
  const [name, setName] = useState<string>("");
  const [account_number, set_account_number] = useState<string>("");
  const { token } = useGetToken();

  const [data, setData] = useState<PaymentInterface | null>(null);
  async function refetch() {
    const res = await paymentInstance(token!).get("");
    setData(res.data.response);
  }

  useEffect(() => {
    refetch();
  }, [token]);

  return { name, setName, account_number, set_account_number, refetch, data };
}
