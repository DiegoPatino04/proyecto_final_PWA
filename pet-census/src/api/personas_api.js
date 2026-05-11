import api from './axios_instance'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'

export const createPerson = async (person_data) => {
  const hashed_password = await bcrypt.hash(person_data.contrasena, 10)

  const payload = {
    id:             uuidv4(),
    nombres:        person_data.nombres,
    apellidos:      person_data.apellidos,
    tipoDocumento:  person_data.tipoDocumento,
    documento:      person_data.documento,
    direccion:      person_data.direccion,
    telefono:       person_data.telefono,
    ciudad:         person_data.ciudad,
    usuario:        person_data.usuario,
    contrasena:     hashed_password
  }

  const response = await api.post('/personas', payload)
  return response.data
}

export const getAllPersons = async () => {
  const response = await api.get('/personas')
  return response.data
}

// Mock para desarrollo sin API
export const createPersonMock = async (person_data) => {
  await new Promise(resolve => setTimeout(resolve, 600))
  const saved = {
    id:       uuidv4(),
    nombres:  person_data.nombres,
    apellidos: person_data.apellidos,
    documento: person_data.documento,
    ciudad:    person_data.ciudad,
    usuario:   person_data.usuario
  }
  const existing = JSON.parse(localStorage.getItem('mock_persons') || '[]')
  localStorage.setItem('mock_persons', JSON.stringify([...existing, saved]))
  return saved
}

export const getAllPersonsMock = async () => {
  await new Promise(resolve => setTimeout(resolve, 400))
  return JSON.parse(localStorage.getItem('mock_persons') || '[]')
}