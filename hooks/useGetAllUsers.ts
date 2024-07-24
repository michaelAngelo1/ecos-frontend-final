import { adminApprovalInstance } from "@/app/config/axiosConfig";
import { ModelUserInterface } from "@/app/config/ModelInterface";
import { useEffect, useState } from "react";

export default function useGetAllUsers(token: string | undefined) {
  const [customers, setCustomers] = useState<ModelUserInterface[]>([
    {
      user_id: "",
      email: "",
      password: "",
      role: "",
      user_detail: {
        name: "",
        grade: "",
        street: "",
        phone: "",
        is_admin_approved: false,
        is_email_verified: false,
        is_phone_verified: false,
        profile_image: "",
      },
    },
  ]);
  const [drivers, setDrivers] = useState<ModelUserInterface[]>([
    {
      user_id: "",
      email: "",
      password: "",
      role: "",
      user_detail: {
        name: "",
        grade: "",
        street: "",
        phone: "",
        is_admin_approved: false,
        is_email_verified: false,
        is_phone_verified: false,
        profile_image: "",
      },
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const refetch = async () => {
    try {
      if (!token) {
        throw new Error("Token is undefined");
      }
      const response = await adminApprovalInstance(token).get("");
      setDrivers(response.data.response.driver);
      setCustomers(response.data.response.customer);
    } catch (e) {
      console.log("error fetch all users", e);
    } finally {
      setLoading(true);
    }
  };
  
  useEffect(() => {
    refetch();
  }, [token]);

  return { customers, drivers, refetch, loading };
}
