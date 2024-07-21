import axios from "axios";

export const authInstance = axios.create({
  baseURL: "http://ecos.joheee.com:4040/auth",
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});

export const userDetailInstance = (token: string) =>
  axios.create({
    baseURL: "http://ecos.joheee.com:4040/user-detail",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const userImageInstance = (token: string) =>
  axios.create({
    baseURL: "http://ecos.joheee.com:4040/user-detail",
    headers: {
      accept: "*/*",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

export const adminApprovalInstance = (token: string) =>
  axios.create({
    baseURL: "http://ecos.joheee.com:4040/admin-approval",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const customerDetailInstance = (token: string) =>
  axios.create({
    baseURL: "http://ecos.joheee.com:4040/customer-detail",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const driverOrderHeaderInstance = (token: string) =>
  axios.create({
    baseURL: "http://ecos.joheee.com:4040/driver-order-header",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const driverOrderHeaderByIdInstance = (token: string, id: string) =>
  axios.create({
    baseURL: `http://ecos.joheee.com:4040/driver-order-header/${id}`,
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const driverDetailInstance = (token: string) =>
  axios.create({
    baseURL: "http://ecos.joheee.com:4040/driver-vehicle-detail",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const adminTimeBlockInstance = (token: string) =>
  axios.create({
    baseURL: "http://ecos.joheee.com:4040/admin-time-block",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const reverseGeocodeInstance = (latitude: number, longitude: number) =>
  axios.create({
    baseURL: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA7LQ6RG8Nc1D3Hkrs0bNMROKUhSpbvPfI`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export const uploadImageVehicleInstance = () =>
  axios.create({
    baseURL: "http://ecos.joheee.com:4050/upload-image/driver-detail",
    headers: {
      accept: "*/*",
      "Content-Type": "multipart/form-data",
    },
  });

export const uploadUserProfileInstance = () =>
  axios.create({
    baseURL: "http://ecos.joheee.com:4050/upload-image/user-detail",
    headers: {
      accept: "*/*",
      "Content-Type": "multipart/form-data",
    },
  });

export const uploadPaymentHeaderImageInstance = () =>
  axios.create({
    baseURL: "http://ecos.joheee.com:4050/upload-image/payment-header",
    headers: {
      accept: "*/*",
      "Content-Type": "multipart/form-data",
    },
  });

export const paymentHeaderInstance = (token: string) =>
  axios.create({
    baseURL: "http://ecos.joheee.com:4040/customer-payment-header",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const customerOrderHeaderInstance = (token: string) =>
  axios.create({
    baseURL: "http://ecos.joheee.com:4040/customer-order-header",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
