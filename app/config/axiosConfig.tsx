import axios from 'axios'

export const authInstance = axios.create({
  baseURL: 'http://ecos.joheee.com:4040/auth',
  headers: {
    'accept': '*/*',
    'Content-Type': 'application/json'
  }
})

export const userDetailInstance = axios.create({
  baseURL: 'http://ecos.joheee.com/user-detail',
  headers: {
    'accept': '*/*',
    'Content-Type': 'application/json'
  }
})

