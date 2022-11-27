import { Request, Response } from 'express'
import { getRespJData, isDefined } from '../helpers/Common'
import { getUserDataWithEmail } from '../models/User'

const loginUser = (req: Request, res: Response): void => {
  const { email, password } = req.body
  if (!isDefined(email) || !isDefined(password)) {
    res.status(400).json(getRespJData(false, 'email or password cannot be empty'))
    return
  }

  getUserDataWithEmail(email).then((resp: any) => {
    let status = false
    let message = 'Invalid email or password'
    let loginData = null
    let statusCode = 400
    if (isDefined(resp) && resp.length > 0) {
      const result = isDefined(resp[0][0]) ? resp[0][0] : null
      if (isDefined(result)) {
        if (result?.password === password) {
          statusCode = 200
          status = true
          message = 'Logged In Successfully'
          loginData = { id: result.id, email: result.email }
        }
      }
    }

    res.status(statusCode).json(getRespJData(status, message, loginData))
  }).catch((error: any) => {
    console.log(error)
    res.status(400).json(getRespJData(false, 'something went wrong'))
  })
}

export { loginUser }
