import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SignupDto } from './dtos';
import hashPassword from 'src/utils/hashpassword';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(data: SignupDto) {
    try {
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
    } catch (error) {
      Logger.error(error.message);
    }
  }

  async signin() {
    return { message: 'signin' };
  }

  async signout() {
    return { message: 'signout' };
  }
}
