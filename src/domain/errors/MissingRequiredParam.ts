export class MissingRequiredParam extends Error {
  constructor(paramName: string) {
    super(`Missing required param: ${paramName}`)
    this.name = 'MissingRequiredParam'
  }
}
