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
  const [loading, setLoading] = useState<boolean>(true)
  async function refetch() {
    setLoading(true)
    const res = await paymentInstance(token!).get("");
    setData(res.data.response);
    setLoading(false)
  }

  useEffect(() => {
    refetch();
  }, [token]);

  return { name, setName, account_number, set_account_number, refetch, data, loading };
}
