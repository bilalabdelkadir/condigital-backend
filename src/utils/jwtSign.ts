import { JwtService } from '@nestjs/jwt';

export function signUser(
  jwtService: JwtService,
  id: string,
  email: string,
): string {
  const payload = { id, email };
  return jwtService.sign(payload);
}
