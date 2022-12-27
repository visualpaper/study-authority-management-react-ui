import querystring from 'query-string'
import { ApiError, isAppError } from '../common/error'
import { STATUS_CODE } from '../common/constants'

function buildUrl(url: any, query: any = null) {
  const strQuery = query ? `?${querystring.stringify(query)}` : ''
  return `${url}${strQuery}`
}

function buildHeaders(headers = {}) {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers,
  }
}
const defaultResponseHandler = (noContents: number[] = []) => {
  noContents.push(STATUS_CODE.NO_CONTENT)
  const hasJson = (status: number) => !noContents.some((st) => st === status)

  return async (response: Response, request: Request) => {
    if (response.ok) {
      return hasJson(response.status) ? response.json() : {}
    } else {
      const json = hasJson(response.status) ? await response.json() : {}
      throw new ApiError(`Error! status:${response.status}`, request, {
        response,
        json,
      })
    }
  }
}

export async function doRequest(
  url: any,
  method: string,
  { headers = {}, params = null, query = null }: any,
  responseHandler = defaultResponseHandler()
) {
  const request = new Request(buildUrl(url, query), {
    method,
    headers: buildHeaders(headers),
    mode: 'cors',
    credentials: 'include',
    body: params ? JSON.stringify(params) : undefined,
  })

  try {
    const response = await fetch(request)
    return await responseHandler(response, request)
  } catch (error: any) {
    if (isAppError(error)) {
      throw error
    }

    // コネクションできないエラーぐらい。
    throw new ApiError(error.message, request, { error })
  }
}

export const get = (url: string, query = {}) => doRequest(url, 'GET', { query })

export const put = (url: string, params = {}, noContents: number[] = []) =>
  doRequest(url, 'PUT', { params }, defaultResponseHandler(noContents))

export const post = (url: string, params = {}, noContents: number[] = []) =>
  doRequest(url, 'POST', { params }, defaultResponseHandler(noContents))

export const deleteMethod = (url: string, query = {}) =>
  doRequest(url, 'DELETE', { query })
