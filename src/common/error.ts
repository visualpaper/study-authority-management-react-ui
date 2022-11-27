import { STATUS_MESSAGES as MESSAGES } from './messages'
import { STATUS_CODE } from './constants'
import { toast } from 'react-toastify'

export function isAppError(
  error: any,
  errorClass = AppError
): error is AppError {
  return error instanceof errorClass
}

export interface HandleOptions {
  displayMessage?: string | null
}
const DEFAULT_OPTIONS = { displayMessage: null }

export class AppError extends Error {
  public error?: Error
  public options: HandleOptions

  constructor(
    message: string,
    {
      error,
      options = DEFAULT_OPTIONS,
    }: {
      error?: Error
      options?: HandleOptions
    } = {}
  ) {
    super(message)
    this.error = error
    this.options = options
  }

  public getDisplayMessage() {
    if (this.options.displayMessage) {
      return this.options.displayMessage
    }
    return this.message
  }

  public addOptions(options: HandleOptions = {}) {
    this.options = {
      ...this.options,
      ...options,
    }
  }
}

export class ApiError extends AppError {
  public static STATUS_CODE = STATUS_CODE

  public request: Request
  public status: number
  public json?: object

  constructor(
    message: string,
    request: Request,
    {
      response,
      json,
      error,
      options = DEFAULT_OPTIONS,
    }: {
      response?: Response
      json?: object
      error?: Error
      options?: HandleOptions
    } = {}
  ) {
    super(message, { error, options })
    this.request = request
    this.status = response ? response.status : STATUS_CODE.CLIENT_UNEXPECTED
    this.json = json
  }

  public isNotFound() {
    return this.status === STATUS_CODE.NOT_FOUND
  }

  public isUnexpected() {
    return (
      this.status === STATUS_CODE.CLIENT_UNEXPECTED ||
      this.status === STATUS_CODE.SERVER_UNKNOWN
    )
  }

  public isUnAuthored() {
    return this.status === STATUS_CODE.UNAUTHORIZED
  }

  public isBadRequest() {
    return this.status === STATUS_CODE.BAD_REQUEST
  }

  public isConflict() {
    return this.status === STATUS_CODE.CONFLICT
  }

  public getDisplayMessage() {
    if (this.options.displayMessage) {
      return this.options.displayMessage
    }
    if (MESSAGES[this.status]) {
      return MESSAGES[this.status]
    }
    return MESSAGES[STATUS_CODE.SERVER_UNKNOWN] + `status:${this.status}`
  }
}

export const defaultUseErrorBoundary = (error: any) => {
  return !isAppError(error)
}

export const defaultOnError = (error: any) => {
  if (isAppError(error)) {
    toast.error(error.getDisplayMessage(), {
      autoClose: false,
    })
  }
}
