import { CORS_CREDENTIALS, CORS_HEADERS, CORS_ORIGIN } from '../config/index.js'


export const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', CORS_ORIGIN)
  res.header('Access-Control-Allow-Headers', CORS_HEADERS)
  res.header('Access-Control-Allow-Credentials', CORS_CREDENTIALS)
  
  next()
}