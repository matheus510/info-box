import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: '//cloud.boxnet.com.br/api/',
  headers: {'Authorization': 'Basic YmFyYmFhOmJhcmJhYQ=='}
})
 