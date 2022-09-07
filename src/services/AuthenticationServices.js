import axios from 'axios'
import { isEmpty } from 'lodash'
import { validateEmail } from '../utils/validations'
import { url_base_api } from '../utils/api_url'

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
        name: response.data.user.name,
        email: response.data.user.email,
        role: response.data.user.role
      }
      data.token = response.data.token
    }
  } catch (error) {
    data.error = 'Email o contraseña incorrecta'
  }
  console.log(data)
  return data
}

export const register = async (formData) => {
  let data = {
    user: null,
    token: null,
    error: null,
  }
  try {
    if (isEmpty(formData.name) || isEmpty(formData.email) || isEmpty(formData.password)) 
    {
      data.error = 'Todos los campos son obligatorios'
    } 
    else if (!validateEmail(formData.email)) 
    {
      data.error = 'El email no es correcto'
    } 
    else 
    {
      const response = await axios({
        method: "POST",
        url: `${url_base_api}/users`,
        data: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      });

      data.user = {
        name: response.data.data.user.nombre,
        email: response.data.data.user.email,
      };

      console.log(data.user);
    }
  } 
  catch (error) 
  {
    console.log(error);
    data.error = 'Email o contraseña incorrecta';
  }

  return data;
}
