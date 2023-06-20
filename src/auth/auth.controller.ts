import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dtos';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() data: SigninDto, @Req() req: Request, @Res() res: Response) {
    return this.authService.signin(data, req, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signout(@Req() req: Request, @Res() res: Response) {
    return this.authService.signout(req, res);
  }
}
