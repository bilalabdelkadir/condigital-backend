import { AccountType } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAccountDto {
  @IsString()
  bankName: string;

  @IsString()
  accountNumber: string;

  @IsEnum(AccountType)
  accountType?: AccountType;

  @IsNumber()
  startingBalance: number;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsNumber()
  minimumBalance: number;

  @IsString()
  country: string;

  @IsString()
  currency: string;
}
