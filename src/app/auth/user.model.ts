export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    // if there is no token expiration date or the current date is later
    // than the token expiration date, return null as a token.
    // why null? because the rules in the firebase realtime database are set to auth != null.
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
