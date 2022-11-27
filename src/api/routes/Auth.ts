import { Application } from 'express'
import { loginUser } from '../controllers/AuthController'

export const Auth = (app: Application): void => {
  app.post('/login', loginUser)
}
