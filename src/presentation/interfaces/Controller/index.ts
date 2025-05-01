export interface HTTPError {
  code: string
  message: string
}

export interface HTTPErrorResponse {
  errors: HTTPError[]
  statusCode: number
}

export interface HTTPResponse {
  data: Record<string, any>
  statusCode: number
}

export interface Controller {
  handle: (...params: any) => Promise<HTTPResponse | HTTPErrorResponse>
}
