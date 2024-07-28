import { userDetailInstance } from "@/app/config/axiosConfig";
import { User } from "@/models/User";
import { useEffect, useState } from "react";

export default function useGetUserData(token: string | undefined) {
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refetch = async () => {
    try {
      if (!token) {
        throw new Error("Token is undefined");
      }

      const response = await userDetailInstance(token).get("");
      const userData = response.data.response;

      setRole(userData.role);
      setEmail(userData.email);
      setUserId(userData.user_id);

      const user = new User(
        userData.user_id,
        userData.email,
        userData.password,
        userData.role,
        userData.user_detail
      );
      setUser(user);
    } catch (e) {
      console.log("Error fetching user data: ", e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    refetch();
  }, [token]);

  return { role, email, userId, user, loading, refetch };
}
