export class ValidationResponse {
  public isValid: boolean;
  public message: string;

  constructor(isValid?: boolean, message?: string) {
    this.isValid = isValid;
    this.message = message;
  }
}
