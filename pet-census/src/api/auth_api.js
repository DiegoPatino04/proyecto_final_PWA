import api from './axios_instance'
import bcrypt from 'bcryptjs'

export const loginUser = async (username, password) => {
  const hashed_password = await bcrypt.hash(password, 10)

  const response = await api.post('/auth/login', {
    usuario: username,
    contrasena: hashed_password
  })

  return response.data
}

// Mock para cuando no tienes la API del profesor aún
export const loginUserMock = async (username, password) => {
  await new Promise(resolve => setTimeout(resolve, 800))

  if (username === 'admin' && password === '1234') {
    return {
      token: 'mock.jwt.token.for.development',
      tipoToken: 'Bearer',
      expiraEn: 3600
    }
  }

  throw new Error('Invalid credentials')
}