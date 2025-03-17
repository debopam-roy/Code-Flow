import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsDateString,
  IsPhoneNumber,
  IsEnum,
  Length,
  MaxLength,
} from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHERS = 'others',
}

export class UserDTO {
  @IsOptional()
  @IsString()
  @Length(6)
  otp?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(Gender, { message: 'Gender must be one of: male, female or other' })
  gender: Gender;

  @IsOptional()
  @MinLength(8)
  @MaxLength(22)
  password: string;

  @IsOptional()
  @IsString()
  profile_picture: string;

  @IsOptional()
  @IsPhoneNumber(null)
  phone_number?: string;

  @IsOptional()
  @IsDateString()
  date_of_birth?: Date;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  country?: string;
}
