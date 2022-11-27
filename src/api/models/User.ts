import { DBConfig } from '../../config'

const getUserDataWithEmail = async (email: string): Promise<any> => {
  const query = `SELECT * FROM users WHERE email='${email}'`

  return await DBConfig.execute(query)
}

export { getUserDataWithEmail }
