import { adminTimeBlockInstance } from "@/app/config/axiosConfig";
import { useEffect, useState } from "react";

export default function useGetOrderWave(token: string | undefined) {
  const [orderWaveList, setOrderWaveList] = useState([
    {
      time_block_id: "",
      start_date: "",
      end_date: "",
      driver_order_header: [],
      user: {
        user_id: "",
        email: "",
        password: "",
        role: "",
        created_at: false,
      },
    },
  ]);

  const refetch = async () => {
    try {
      const response = await adminTimeBlockInstance(token!).get("");
      console.log("order wave available: ", response.data.response);
      setOrderWaveList(response.data.response);
    } catch (e: any) {
      console.log("error fetch order wave: ", e.response);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { orderWaveList, refetch };
}
