import { userDetailInstance } from "@/app/config/axiosConfig";
import { User } from "@/models/User";
import { useEffect, useState } from "react";

export default function useGetUserData(token: string | undefined) {
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Define an async function inside the effect
    const fetchUserData = async () => {
      try {
        // Await the token
        if (!token) {
          throw new Error("Token is undefined");
        }

        // Fetch user data
        const response = await userDetailInstance(token).get("");
        const userData = response.data.response;

        // Set the state with the fetched data
        setRole(userData.role);
        setEmail(userData.email);
        console.log("USER DATA: ", userData.role);

        // Create a new User instance and set it in the state
        const user = new User(
          userData.email,
          userData.password,
          userData.role,
          userData.user_detail
        );
        setUser(user);
      } catch (e) {
        console.log("Error fetching user data: ", e);
      } finally {
        // Set loading to false after the data is fetched
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  return { role, email, user, loading };
}
