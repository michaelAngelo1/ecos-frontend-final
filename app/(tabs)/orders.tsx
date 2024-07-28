import { SafeAreaView } from "react-native-safe-area-context";
import useGetToken from "@/hooks/useGetToken";
import useGetUserData from "@/hooks/useGetUserData";
import OverlayLoading from "@/components/OverlayLoading";
import AdminOrders from "../page/orders/AdminOrders";
import DriverOrders from "../page/orders/DriverOrders";
import CustomerOrders from "../page/orders/CustomerOrders";

const Orders = () => {
  // custom hooks
  const { token } = useGetToken();
  const { role } = useGetUserData(token);

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      {role == "CUSTOMER" ? (
        <CustomerOrders />
      ) : role == "DRIVER" ? (
        <DriverOrders />
      ) : role == "ADMIN" ? (
        <AdminOrders />
      ) : (
        <OverlayLoading />
      )}
    </SafeAreaView>
  );
};

export default Orders;
