import api from './axios_instance'
import { v4 as uuidv4 } from 'uuid'

const pet_types  = ['DOG', 'CAT', 'BIRD', 'RABBIT', 'OTHER']
const pet_genders = ['MALE', 'FEMALE']

export const createPet = async (pet_data) => {
  const payload = {
    id:         uuidv4(),
    nombre:     pet_data.nombre,
    tipo:       pet_data.tipo,
    genero:     pet_data.genero,
    edad:       parseFloat(pet_data.edad),
    fotografia: pet_data.fotografia
  }

  const response = await api.post('/mascotas', payload)
  return response.data
}

export const getAllPets = async () => {
  const response = await api.get('/mascotas')
  return response.data
}

export const createPetMock = async (pet_data) => {
  await new Promise(resolve => setTimeout(resolve, 600))

  const saved = {
    id:         uuidv4(),
    nombre:     pet_data.nombre,
    tipo:       pet_data.tipo,
    genero:     pet_data.genero,
    edad:       parseFloat(pet_data.edad),
    fotografia: pet_data.fotografia
  }

  const existing = JSON.parse(localStorage.getItem('mock_pets') || '[]')
  localStorage.setItem('mock_pets', JSON.stringify([...existing, saved]))
  return saved
}

export const getAllPetsMock = async () => {
  await new Promise(resolve => setTimeout(resolve, 400))
  return JSON.parse(localStorage.getItem('mock_pets') || '[]')
}

export { pet_types, pet_genders }