export interface ModelUserInterface {
  user_id: string;
  email: string;
  password: string;
  role: string;
  user_detail: ModelUserDetailInterface;
}

export interface ModelUserDetailInterface {
  name: string;
  grade: number;
  street: string;
  phone: string;
  is_admin_approved: boolean;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  profile_image: string;
}
