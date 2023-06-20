import { BadRequestException, Injectable, Logger } from '@nestjs/common';
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

  findAll() {
    return `This action returns all account`;
  }

  findOne(id: string) {
    return `This action returns a #${id} account`;
  }

  update(id: string, updateAccountDto: UpdateAccountDto) {
    // check if the data exist
  }

  remove(id: string) {
    return `This action removes a #${id} account`;
  }
}
