import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateAdminUserDto {
  @IsEmail()
  email: string;

  @Length(8, 50)
  password: string;

  @IsNotEmpty()
  @MaxLength(50)
  userName: string;

  @IsBoolean()
  isActive: boolean;
}
