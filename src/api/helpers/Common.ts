import { RequestResp } from '../interfaces'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

const isDefined = (val: any): boolean => {
  return (val !== undefined && val !== null)
}

const getRespJData = (status: boolean, message: string, data?: any): RequestResp => {
  return { status, message, data }
}

function authenticateToken (req: Request, res: Response, next: any): any {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET ?? '', (err: any, user: any) => {
    if (err != null) return res.sendStatus(403)
    next()
  })
}

function parseAuthToken (authHeader: string | undefined): any {
  const token = authHeader?.split(' ')[1] ?? ''
  return jwt.decode(token)
}

export { isDefined, getRespJData, authenticateToken, parseAuthToken }
