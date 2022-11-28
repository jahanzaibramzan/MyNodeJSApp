import { User } from '../interfaces'
import { DBConfig } from '../../config'
import bcrypt from 'bcrypt'

const register = async (props: User): Promise<any> => {
  const { email, password, firstName, lastName } = props

  const hashedPass = await bcrypt.hash(password, 10)

  const query = `INSERT INTO users (email, password, first_name, last_name) 
  VALUES (
    '${email}',
    '${String(hashedPass)}',
    '${String(firstName)}',
    '${String(lastName)}'
)`
  return await DBConfig.execute(query)
}

export { register }
