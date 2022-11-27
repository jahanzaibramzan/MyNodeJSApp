import { Application } from 'express'
import { Auth as AuthRoutes } from './Auth'

export const initRoutes = (app: Application): void => {
  // auth routes
  AuthRoutes(app)
}
