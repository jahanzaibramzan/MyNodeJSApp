import { Application } from 'express'
import { loginUser, registerUser } from '../controllers/AuthController'

export const Auth = (app: Application): void => {
  app.post('/login', loginUser)
  app.post('/register', registerUser)
}
