import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SigninOkResponseDto, SigninUnauthorizedResponseDto } from './dto/signin-responses.dto';
import { InternalServerErrorExceptionDto } from '../utils/common/dto/internal-server-error-exception.dto';
import { SignupBadRequestResponseDto, SignupConflictResponseDto } from './dto/signup-responses.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Signup a new user', 
    description: 'This endpoint allows a new user to create an account. The user must provide a valid username and secure password (meeting the defined complexity requirements). Upon successful registration, an HTTP 201 response is returned.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED, 
    description: 'The user has been saved successfully'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST, 
    description: 'The username and/or password validation failed, check the response for the error.',
    type: SignupBadRequestResponseDto
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT, 
    description: 'The username is already in use.',
    type: SignupConflictResponseDto
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, 
    description: 'Something wrong happened. Please try again.',
    type: InternalServerErrorExceptionDto
  })
  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @ApiOperation({
    summary: 'Signin user', 
    description: 'This endpoint allows a new user to sign in and receive an accessToken on successful authentication.',
  })
  @ApiResponse({
    status: HttpStatus.OK, 
    description: 'The user was authenticated successfully',
    type: SigninOkResponseDto
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED, 
    description: 'The username or password is incorrect.',
    type: SigninUnauthorizedResponseDto
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, 
    description: 'Something wrong happened. Please try again.',
    type: InternalServerErrorExceptionDto
  })
  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<SigninOkResponseDto> {
    return this.authService.signIn(authCredentialsDto);
  }
}
