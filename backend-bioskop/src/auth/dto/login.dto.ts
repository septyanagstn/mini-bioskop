import { ApiProperty } from '@nestjs/swagger';
import { IS_STRONG_PASSWORD, IsEmail, IsString, IsStrongPassword, MaxLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'customer@example.com' })
  email: string;

  @IsString()
  @MaxLength(12)
  @IsStrongPassword()
  @ApiProperty({ example: '*P4swo12d' })
  password: string;
}
