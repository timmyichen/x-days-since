import axios from 'axios'
import { validate as validateUuid } from 'uuid'

axios.interceptors.request.use(function (config) {
  if (typeof window !== 'undefined') {
    const urlParts = config.url?.split('/') || []
    const uuid = urlParts[3]
    const token = localStorage.getItem(`authtoken-${uuid}`)
    if (
      config.method !== 'get' &&
      urlParts[1] === 'api' &&
      urlParts[2] === 'pages' &&
      validateUuid(uuid) &&
      config.headers &&
      token
    ) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config;
});