import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signup() {
    return { message: 'signup' };
  }

  async signin() {
    return { message: 'signin' };
  }

  async signout() {
    return { message: 'signout' };
  }
}
