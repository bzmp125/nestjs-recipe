import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    name: 'username',
    description: 'Username must be 4-20 characters long.',
    example: 'admin'
  })
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  @ApiProperty({
    name: 'password',
    description: 'Password must be 8-32 characters long, include at least one uppercase letter, one lowercase letter, and one number or special character.',
    example: 'secure12#passwOrd'
  })
  password: string;
}
