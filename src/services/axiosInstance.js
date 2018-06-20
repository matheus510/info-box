import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://pacific-river-96582.herokuapp.com/cloud.boxnet.com.br/api/',
  headers: {'Authorization': 'Basic YmFyYmFhOmJhcmJhYQ=='}
})
 