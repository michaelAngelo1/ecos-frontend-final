import { driverOrderHeaderInstance } from "@/app/config/axiosConfig";
import { useEffect, useState } from "react";

export default function useGetAllDriverRequests(token: string | undefined) {
  const [driverRegistrationList, setDriverRegistrationList] = useState([
    {
      order_id: "",
      driver_id: "",
      is_admin_approved: false,
      admin_time_block: {
        end_date: "",
        start_date: "",
        time_block_id: "",
      },
      user: {
        email: "",
        role: "",
        user_detail: {
          name: "",
          phone: "",
        },
      },
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const refetch = async () => {
    try {
      if (!token) {
        throw new Error("Token is undefined");
      }
      const response = await driverOrderHeaderInstance(token!).get("");
      setDriverRegistrationList(response.data.response);
    } catch (e) {
      console.log("error fetch registrations driver", e);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    refetch();
  }, [token]);

  return { driverRegistrationList, refetch, loading };
}
