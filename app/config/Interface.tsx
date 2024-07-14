import { ImageSourcePropType } from "react-native"

export interface IconProps {
  icon: ImageSourcePropType
  color: string
  name: string
  focused: boolean
}

export interface CustomButtonProps {
  actionText: string
  textColor: string
  bgColor: string
  handlePress: () => void
}

export interface SignUpCustomerProps {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  pickUpAddress: string
  password: string
  grade: string
  binusianId: string
  parentsPhone: string
}

export interface SignUpDriverProps {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  pickUpAddress: string
  password: string
  grade: string
  binusianId: string
}

export interface SignInProps {
  email: string
  password: string
}

export interface VehicleInfoProps {
  vehicleModel: string
  seatCapacity: string
  numberPlate: string
  yearReleased: string
}

