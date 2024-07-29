import { ImageSourcePropType } from "react-native";

export interface IconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

export interface CustomButtonProps {
  actionText: string;
  textColor: string;
  bgColor: string;
  handlePress: () => void;
}

export interface SignUpCustomerProps {
  firstName: string;
  email: string;
  phoneNumber: string;
  pickUpAddress: string;
  password: string;
  grade: string;
  binusianId: string;
  parentsPhone: string;
}

export interface SignUpDriverProps {
  firstName: string;
  email: string;
  phoneNumber: string;
  pickUpAddress: string;
  password: string;
  grade: string;
  binusianId: string;
  parentsPhone: string;
}

export interface SignInProps {
  email: string;
  password: string;
}

export interface VehicleInfoProps {
  vehicleModel: string;
  seatCapacity: string;
  numberPlate: string;
  yearReleased: string;
}

export interface DriverRegisInterface {
  order_id: string
  driver_id: string
  is_admin_approved: boolean
  admin_time_block: {
    end_date: string
    start_date: string
    time_block_id: string
  }
  user: {
    email: string
    role: string
    user_detail: {
      name: string
      phone: string
    }
  }
}