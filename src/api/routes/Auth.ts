import { Application } from 'express'
import { generateAccessToken, loginUser, logoutUser, registerUser } from '../controllers/AuthController'
import { authenticateToken } from '../helpers/Common'

export const Auth = (app: Application): void => {
  app.post('/login', loginUser)
  app.post('/register', registerUser)
  app.post('/token', authenticateToken, generateAccessToken)
  app.delete('/logout', authenticateToken, logoutUser)
}
