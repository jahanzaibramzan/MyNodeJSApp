import { Request, Response } from 'express'
import { getRespJData, isDefined } from '../helpers/Common'
import { register } from '../models/Auth'
import { getUserDataWithEmail } from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { LoginResp } from '../interfaces'

dotenv.config()

const loginUser = (req: Request, res: Response): void => {
  const { email, password } = req.body
  if (!isDefined(email) || !isDefined(password)) {
    res.status(400).json(getRespJData(false, 'email or password cannot be empty'))
    return
  }

  getUserDataWithEmail(email)
    .then(async (resp: any) => {
      let status = false
      let message = 'Invalid email or password'
      let loginData = null
      let statusCode = 400
      if (isDefined(resp) && resp.length > 0) {
        const result = isDefined(resp[0][0]) ? resp[0][0] : null
        if (isDefined(result)) {
          if (await bcrypt.compare(password, result.password)) {
            statusCode = 200
            status = true
            message = 'Logged In Successfully'
            loginData = await generateLoginResp(result.id)
          }
        }
      }

      res.status(statusCode).json(getRespJData(status, message, loginData))
    })
    .catch((error: any) => {
      console.log(error)
      res.status(400).json(getRespJData(false, 'something went wrong'))
    })
}

const registerUser = (req: Request, res: Response): void => {
  const { email, password, firstName, lastName } = req.body
  if (!isDefined(email) || !isDefined(password)) {
    res.status(400).json(getRespJData(false, 'email or password cannot be empty'))
    return
  }

  register({ email, password, firstName, lastName })
    .then(async (resp: any) => {
      const userId = resp[0].insertId
      const lData = await generateLoginResp(userId)
      res.status(201).json(getRespJData(true, 'Registered Successfully', lData))
    })
    .catch((error: any) => {
      console.log(error)
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(400).json(getRespJData(false, 'This email has already been used'))
        return
      }
      res.status(400).json(getRespJData(false, 'something went wrong'))
    })
}

const generateLoginResp = async (userId: string): Promise<LoginResp> => {
  const accessTokenKey = process.env.ACCESS_TOKEN_SECRET ?? ''
  const refreshTokenKey = process.env.REFRESH_TOKEN_SECRET ?? ''

  const accessToken = await jwt.sign({ userId }, accessTokenKey)
  const refreshToken = await jwt.sign({ userId }, refreshTokenKey)
  return {
    id: userId,
    access_token: accessToken,
    refresh_token: refreshToken
  }
}

export { loginUser, registerUser }
