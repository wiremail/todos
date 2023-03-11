import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common'
import { Response } from 'express'

import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

interface IEnpointResponse {
  statusCode: number
  message: string
  jwt?: string
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UsePipes(new ValidationPipe())
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<IEnpointResponse> {
    return this.authService.signup(createUserDto)
  }

  @UsePipes(new ValidationPipe())
  @Post('signin')
  async signin(@Body() authDto: AuthDto, @Res({ passthrough: true }) response: Response): Promise<IEnpointResponse> {
    return this.authService.signin(authDto, response)
  }

  @Post('signout')
  async signout(@Res({ passthrough: true }) response: Response) {
    return this.authService.signout(response)
  }
}
