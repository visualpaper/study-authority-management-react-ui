import { STATUS_CODE } from './constants'

export const COMMON_MESSAGES = {
  SUCCESS_UPDATE: 'Success update',
}

export const STATUS_MESSAGES = {
  [STATUS_CODE.BAD_REQUEST]: 'bad request',
  [STATUS_CODE.UNAUTHORIZED]: 'un authorized',
  [STATUS_CODE.FORBIDDEN]: 'forbidden',
  [STATUS_CODE.NOT_FOUND]: 'not found',
  [STATUS_CODE.TOO_MANY_REQUEST]: 'too many request',
  [STATUS_CODE.SERVER_ERROR]: 'server error',
  [STATUS_CODE.SERVICE_UNAVAILABLE]: 'service unavailable',
  [STATUS_CODE.SERVER_UNKNOWN]: 'server unknown',
  [STATUS_CODE.CLIENT_UNEXPECTED]: 'client unexpected',
}

export const USERS_MESSAGES = {
  CONFLICT: 'ユーザ名が重複しています',
}
