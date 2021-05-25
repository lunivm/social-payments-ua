export class HttpError extends Error {
  public status: number;

  constructor(message?: string) {
    super(message);
  }
}
