import { RequestResp } from '../interfaces'

const isDefined = (val: any): boolean => {
  return (val !== undefined && val !== null)
}

const getRespJData = (status: boolean, message: string, data?: any): RequestResp => {
  return { status, message, data }
}

export { isDefined, getRespJData }
