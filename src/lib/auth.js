export function setToken(token) {
  window.localStorage.setItem('token', token)
}

export function getToken() {
  return window.localStorage.getItem('token')
}

export function removeToken() {
  window.localStorage.removeItem('token')
}

export function setUserId(userId) {
  window.localStorage.setItem('userId', userId)
  console.log(`userId has been set to ${userId}`)
}

export function getUserId(){
  return window.localStorage.getItem('userId')
}

export function removeUserId(){
  window.localStorage.removeItem('userId')
}

function getPayload() {
  const token = getToken()

  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3) return false
  return JSON.parse(atob(parts[1]))
}

export function isAuthenticated() {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000)
  return now < payload.exp
}

export function isOwner(passedId) {
  const userId1 = getUserId()
  if (!isAuthenticated()) return false
  return Number(userId1) === Number(passedId)
}