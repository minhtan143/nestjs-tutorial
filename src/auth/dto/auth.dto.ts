export class AuthDto {
  access_token: string;

  constructor(access_token: string) {
    this.access_token = access_token;
  }
}
