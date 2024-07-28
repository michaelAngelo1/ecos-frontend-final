class UserDetail {
  email: string;
  grade: number;
  is_admin_approved: boolean;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  name: string;
  phone: string;
  profile_image: string;
  street: string;
  vehicle_capacity: number | null;
  vehicle_category: string | null;
  vehicle_image: string | null;
  vehicle_model: string | null;
  vehicle_number_plate: string | null;

  constructor(
    email: string,
    grade: number,
    is_admin_approved: boolean,
    is_email_verified: boolean,
    is_phone_verified: boolean,
    name: string,
    phone: string,
    profile_image: string,
    street: string,
    vehicle_capacity: number | null = null,
    vehicle_category: string | null = null,
    vehicle_image: string | null = null,
    vehicle_model: string | null = null,
    vehicle_number_plate: string | null = null
  ) {
    this.email = email;
    this.grade = grade;
    this.is_admin_approved = is_admin_approved;
    this.is_email_verified = is_email_verified;
    this.is_phone_verified = is_phone_verified;
    this.name = name;
    this.phone = phone;
    this.profile_image = profile_image;
    this.street = street;
    this.vehicle_capacity = vehicle_capacity;
    this.vehicle_category = vehicle_category;
    this.vehicle_image = vehicle_image;
    this.vehicle_model = vehicle_model;
    this.vehicle_number_plate = vehicle_number_plate;
  }
}

export class User {
  user_id: string;
  email: string;
  password: string;
  role: string;
  user_detail: UserDetail;

  constructor(
    user_id: string,
    email: string,
    password: string,
    role: string,
    user_detail: UserDetail
  ) {
    this.user_id = user_id;
    this.email = email;
    this.password = password;
    this.role = role;
    this.user_detail = user_detail;
  }
}
