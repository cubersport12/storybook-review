import { LoginResultDto, LoginUserDto } from '@dto';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { Public } from '@entities';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Авторизоваться в системе' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LoginResultDto,
  })
  public login(@Body() user: LoginUserDto): LoginResultDto {
    return {
      access_token: this.service.login({
        username: user.username,
        password: user.password,
      }),
    };
  }
}
