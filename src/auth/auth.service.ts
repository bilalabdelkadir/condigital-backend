import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SigninDto, SignupDto } from './dtos';
import hashPassword from 'src/utils/hashpassword';
import comparePassword from 'src/utils/compareHashedPassword';
import { signUser } from 'src/utils/jwtSign';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async signup(data: SignupDto) {
    // find if user with that email exists
    const userExist = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    // if there is user with this email address it will throw Badrequest error
    if (userExist) {
      throw new BadRequestException(
        'An account with this email addres already exist',
      );
    }
    // we will then hash the password
    const hashed = await hashPassword(data.password);

    // create the user
    const user = await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        hashedPassword: hashed,
      },
    });

    Logger.log(user);

    Logger.log(`user with ${user.email} have been created succesfully`);

    // we delete the user password from the object
    delete user.hashedPassword;

    // we return success message and the user object
    return { success: true, user };
  }

  async signin(data: SigninDto, req: Request, res: Response) {
    // find if user with that email exists
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    // if there is user with this email address it will throw Badrequest error
    if (!user) {
      throw new BadRequestException('there is no user with this email address');
    }
    // compare the new password with the hash password

    const isMatch = await comparePassword(data.password, user.hashedPassword);

    // if the password match returns true assing jwt access token

    if (!isMatch) {
      throw new BadRequestException('Wrong password');
    }

    const token = signUser(this.jwtService, user.id, user.email);

    // if any error happen while generating the token
    if (!token) {
      throw new ForbiddenException(
        'Error happened while signing in please try again',
      );
    }

    res.cookie('token', token);

    // sign jwt token and return to the user

    return res.send({ success: true, message: 'Signed in succesfully' });
  }

  async signout(req: Request, res: Response) {
    res.clearCookie('token');
    res.send({ success: true, message: 'signed out succesfully' });
  }
}
