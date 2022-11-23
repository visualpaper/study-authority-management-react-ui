import { BASE_URL } from '../common/constants'
import { AuthorityLevel } from '../model/user'
import { get, put, post } from './suppot'

export interface User {
  id: string
  name: string
  authorityLevel: AuthorityLevel
}

const url = () => BASE_URL + `/v1/users`
const userUrl = (id: string) => BASE_URL + `/v1/users/${id}`

const registUrl = () => BASE_URL + `/v1/users/regist`

export async function getUsers(): Promise<User[]> {
  const response = await get(url())
  return response.users
}

export async function registUser(id: string, name: string, password: string) {
  await post(registUrl(), { id, name, password })
}

export async function getEditUser(id: string): Promise<User | null> {
  const response = await get(userUrl(id))
  return response
}

export async function editUser(id: string, authorityLevel: AuthorityLevel) {
  await put(userUrl(id), { authorityLevel })
}
