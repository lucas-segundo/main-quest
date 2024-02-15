export interface HTTPErrorResponse {
  errors: string[]
  statusCode: number
}

export interface HTTPResponse {
  data: Record<string, any>
  statusCode: number
}

export interface Controller {
  handle: (params: any) => Promise<HTTPResponse | HTTPErrorResponse>
}
