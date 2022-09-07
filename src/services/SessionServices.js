import axios from 'axios'
import { isEmpty } from 'lodash'
import { validateEmail } from './../utils/validations'
import { url_base_api } from './../utils/api_url'

export const login = async (formData) => {
  let data = {
    user: null,
    token: null,
    error: null,
  }
  try {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      data.error = 'Todos los campos son obligatorios'
    } else if (!validateEmail(formData.email)) {
      data.error = 'El email no es correcto'
    } else {
      const response = await axios({
        method: 'POST',
        url: `${url_base_api}/login`,
        data: formData,
      })
      data.user = {
        name: response.data.user.nombre,
        email: response.data.user.email,
      }
      data.token = response.data.token
    }
  } catch (error) {
    data.error = 'Email o contraseña incorrecta'
  }
  return data
}

export const register = async (formData) => {
  let data = {
    user: null,
    token: null,
    error: null,
  }
  try {
    if (
      isEmpty(formData.name) ||
      isEmpty(formData.document) ||
      isEmpty(formData.email) ||
      isEmpty(formData.password)
    ) {
      data.error = 'Todos los campos son obligatorios'
    } else if (!validateEmail(formData.email)) {
      data.error = 'El email no es correcto'
    } else {
      const response = await axios({
        method: 'POST',
        url: `${url_base_api}/register`,
        data: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      })
      data.user = {
        name: response.data.data.user.name,
        email: response.data.data.user.email,
      }
      data.token = '12345'
    }
  } catch (error) {
    data.error = 'Email o contraseña incorrecta'
  }
  return data
}
