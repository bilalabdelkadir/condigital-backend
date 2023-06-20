import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Request, Response } from 'express';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}
  async create(createAccountDto: CreateAccountDto, userId: string) {
    // we check if bank bank account with the bank account number exist
    const accountExist = await this.prisma.account.findFirst({
      where: {
        accountNumber: createAccountDto.accountNumber,
      },
    });

    // throw error if account exits
    if (accountExist) {
      Logger.error(
        `there is account with the ${createAccountDto.accountNumber} with the id ${accountExist.accountNumber}`,
      );
      throw new BadRequestException(
        'An Account with this Account Number exist',
      );
    }

    // create an account
    const account = await this.prisma.account.create({
      data: {
        ...createAccountDto,
        addedBy: { connect: { id: userId } },
      },
    });

    // if error occured
    if (!account) {
      Logger.error('error occured');
      throw new BadRequestException('error happen while creating account');
    }

    // if succesffull return the newly created account
    return { success: true, message: 'Account created', account };
  }

  async findAll() {
    const accounts = await this.prisma.account.findMany({});
    const count = await this.prisma.account.count();
    return { success: true, count, accounts };
  }

  async findOne(id: string) {
    const account = await this.prisma.account.findUnique({
      where: {
        id,
      },
    });

    if (!account) {
      throw new NotFoundException('there is no account with this id');
    }

    // return the accound
    return { success: true, account };
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    // check if the data exist
    const accountExist = await this.prisma.account.findUnique({
      where: {
        id,
      },
    });

    if (!accountExist) {
      throw new NotFoundException('there is no account with this id');
    }

    const updatedAccount = await this.prisma.account.update({
      where: {
        id,
      },
      data: {
        ...updateAccountDto,
      },
    });

    return {
      success: true,
      message: 'Account updated succesfully',
      updatedAccount,
    };
  }

  async remove(id: string) {
    // check if the data exist
    const accountExist = await this.prisma.account.findUnique({
      where: {
        id,
      },
    });

    if (!accountExist) {
      throw new NotFoundException('there is no account with this id');
    }

    const deletedAccount = await this.prisma.account.delete({
      where: {
        id,
      },
    });

    if (!deletedAccount) {
      throw new BadRequestException('Error happened while deleting');
    }

    return { success: true, message: 'account deleted successfully' };
  }
}
