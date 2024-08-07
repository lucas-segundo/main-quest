export class KnownError extends Error {
  constructor(
    readonly code: string,
    message: string,
  ) {
    super(message)
    this.code = code
  }
}
