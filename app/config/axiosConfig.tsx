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