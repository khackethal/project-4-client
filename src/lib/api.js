import axios from 'axios'
import { getToken } from '../lib/auth'

export const baseUrl = '/api'

export const registerPath = '/auth/register/'
export const loginPath = '/auth/login/'
export const userProfileViewPath = '/auth/profile/'
export const editUserProfilePath = '/edit/'
export const checkUserPath = '/checkuser'

export const allTripsPath = '/trips/'
export const TripLikePath = '/like/'

export const commentPath = '/comments/'
export const editPath = '/edit'

export function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

//* View all/ single Trips, edit, delete create Trips
export function getAllTrips() {
  return axios.get(`${baseUrl}${allTripsPath}`)
}

export function getSingleTrip(tripId) {
  return axios.get(`${baseUrl}${allTripsPath}${tripId}/`)
}

export function createTrip(formdata) {
  return axios.post(`${baseUrl}${allTripsPath}`, formdata, headers())
}

export function EditTrip(id, formdata) {
  return axios.put(`${baseUrl}${allTripsPath}${id}/`, formdata, headers())
}

export function deleteTrip(id) {
  return axios.delete(`${baseUrl}${allTripsPath}${id}/`, headers())
}

//* Comment on a Trip
export function commentOnTrip(id){
  return axios.post(`${baseUrl}${allTripsPath}${id}${commentPath}`, headers())
}

//* Delete a comment
export function deleteCommentOnTrip(tripId, commentId) {
  return axios.delete(`${baseUrl}${allTripsPath}${tripId}${commentPath}${commentId}`, headers())
}

//* Like/ unlike a trip toggle
export function likeAndUnlikeTrip(id){
  return axios.post(`${baseUrl}${allTripsPath}${id}${TripLikePath}`, headers())
}




// * Authentication Requests
export function registerUser(formdata) {
  return axios.post(`${baseUrl}${registerPath}`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}${loginPath}`, formdata)
}
export function userCheck(formData) {
  return axios.post(`${baseUrl}${registerPath}${checkUserPath}`, formData)
}

//* User Profile View
export function userProfileView(userId){
  return axios.get(`${baseUrl}${userProfileViewPath}${userId}`, headers())
}

//* Edit Profile View
export function editUserProfile(id, formdata) {
  return axios.put(`${baseUrl}${userProfileViewPath}${id}/edit/`, formdata, headers())
}


//* To add user list view routes