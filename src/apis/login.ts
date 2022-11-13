import { BASE_URL } from '../common/constants'
import { User } from '../model/user'
import { post } from './suppot'

const url = () => BASE_URL + `/v1/login`
const urlWithCookie = () => BASE_URL + `/v1/loginWithCookie`

export async function login(id: string, password: string): Promise<User> {
  const response = await post(url(), { id, password })
  return response
}

export async function loginWithCookie(): Promise<User | null> {
  const response = await post(urlWithCookie())
  return response
}
