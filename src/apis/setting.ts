import { BASE_URL } from '../common/constants'
import { User } from '../model/user'
import { put } from './suppot'

const url = () => BASE_URL + `/v1/setting`

export async function setting(id: string, name: string): Promise<User> {
  const response = await put(url(), { id, name })
  return response
}
