import api from './axios_instance'
import { v4 as uuidv4 } from 'uuid'
import { PROJECT_CONFIG } from '../utils/config'

// Field mapper — adapts to any backend (Python snake_case or TS camelCase)
// Change these keys to match whatever the professor's API expects
const buildCensusPayload = (census_data) => ({
  id:          uuidv4(),
  idMascota:   census_data.petId,
  idDueno:     census_data.ownerId,
  fotografia:  census_data.photo,
  lat:         census_data.lat,
  lon:         census_data.lon,
  idProyecto:  PROJECT_CONFIG.idProyecto,
  color:       PROJECT_CONFIG.color
})

// If professor uses Python/snake_case, swap buildCensusPayload for this:
// const buildCensusPayloadSnake = (census_data) => ({
//   id:          uuidv4(),
//   id_mascota:  census_data.petId,
//   id_dueno:    census_data.ownerId,
//   fotografia:  census_data.photo,
//   lat:         census_data.lat,
//   lon:         census_data.lon,
//   id_proyecto: PROJECT_CONFIG.idProyecto,
//   color:       PROJECT_CONFIG.color
// })

export const createCensus = async (census_data) => {
  const payload = buildCensusPayload(census_data)
  const response = await api.post('/censos', payload)
  return response.data
}

export const getAllCensus = async () => {
  const response = await api.get('/censos')
  return response.data
}

export const createCensusMock = async (census_data) => {
  await new Promise(resolve => setTimeout(resolve, 700))

  const saved = {
    id:        uuidv4(),
    petId:     census_data.petId,
    ownerId:   census_data.ownerId,
    photo:     census_data.photo,
    lat:       census_data.lat,
    lon:       census_data.lon,
    idProyecto: PROJECT_CONFIG.idProyecto,
    color:     PROJECT_CONFIG.color,
    pet: census_data.petSnapshot,
    owner: census_data.ownerSnapshot
  }

  const existing = JSON.parse(localStorage.getItem('mock_census') || '[]')
  localStorage.setItem('mock_census', JSON.stringify([...existing, saved]))
  return saved
}

export const getAllCensusMock = async () => {
  await new Promise(resolve => setTimeout(resolve, 400))
  return JSON.parse(localStorage.getItem('mock_census') || '[]')
}