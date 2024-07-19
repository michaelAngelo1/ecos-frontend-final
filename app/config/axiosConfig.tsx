import axios from 'axios'

export const authInstance = axios.create({
  baseURL: 'http://ecos.joheee.com:4040/auth',
  headers: {
    'accept': '*/*',
    'Content-Type': 'application/json'
  }
})

export const userDetailInstance = (token:string) => axios.create({
  baseURL: 'http://ecos.joheee.com:4040/user-detail',
  headers: {
    'accept': '*/*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
})


export const userImageInstance = (token:string) => axios.create({
  baseURL: 'http://ecos.joheee.com:4040/user-detail',
  headers: {
    'accept': '*/*',
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`,
  }
})

export const adminApprovalInstance = (token:string) => axios.create({
  baseURL: 'http://ecos.joheee.com:4040/admin-approval',
  headers: {
    'accept': '*/*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
})

export const customerDetailInstance = (token:string) => axios.create({
  baseURL: 'http://ecos.joheee.com:4040/customer-detail',
  headers: {
    'accept': '*/*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
})

export const driverOrderHeaderInstance = (token:string) => axios.create({
  baseURL: 'http://ecos.joheee.com:4040/driver-order-header',
  headers: {
    'accept': '*/*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
})

export const driverDetailInstance = (token:string) => axios.create({
  baseURL: 'http://ecos.joheee.com:4040/driver-vehicle-detail',
  headers: {
    'accept': '*/*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
})

export const adminTimeBlockInstance = (token:string) => axios.create({
  baseURL: 'http://ecos.joheee.com:4040/admin-time-block',
  headers: {
    'accept': '*/*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
})

