import { driverOrderHeaderInstance } from "@/app/config/axiosConfig";
import { useEffect, useState } from "react";

export default function useGetAvailableDrivers(token: string | undefined) {
  const [availableDrivers, setAvailableDrivers] = useState([
    {
      order_id: "",
      driver_id: "",
      is_admin_approved: true,
      user: {
        user_id: "",
        email: "",
        role: "",
        user_detail: {
          profile_image: "",
          phone: "",
          name: "",
          street: "",
        },
      },
      admin_time_block: {
        end_date: "",
        start_date: "",
        time_block_id: "",
      },
    },
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  const refetch = async () => {
    try {
      if (!token) {
        throw new Error("Token is undefined");
      }
      const response = await driverOrderHeaderInstance(token).get("");
      console.log("response available drivers: ", response.data.response);
      setAvailableDrivers(response.data.response);
    } catch (e: any) {
      console.log("error fetch available drivers: ", e.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [token]);

  return { availableDrivers, refetch, loading };
}
