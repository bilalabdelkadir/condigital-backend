import { ConfigService } from '@nestjs/config';

const configservice = new ConfigService();
const secret = configservice.get('JWT_SECRET');
export const jwtConstant = {
  secret: secret,
};
