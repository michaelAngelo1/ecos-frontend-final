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