import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @ApiProperty({ example: 'customer@example.com' })
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(12)
  @IsStrongPassword()
  @ApiProperty({ example: '*P4swo12d', minLength: 8, maxLength: 72 })
  password: string;
}
