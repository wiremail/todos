import { BadRequestException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { hash, verify } from 'argon2'
import { Model } from 'mongoose'
import { Response } from 'express'

import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { User, UserDocument } from 'src/users/schemas/user.schema'
import { AuthDto } from './dto/auth.dto'

interface IEnpointResponse {
  statusCode: number
  message: string
  jwt?: string
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtServise: JwtService
  ) { }

  // User Registration
  async signup(createUserDto: CreateUserDto): Promise<IEnpointResponse> {
    let user = await this.userModel.findOne({ name: createUserDto.name })
    if (user) throw new BadRequestException(`The name ${createUserDto.name} is alredy taken`)

    user = await this.userModel.findOne({ email: createUserDto.email })
    if (user) throw new BadRequestException('User already exists')

    createUserDto.password = await hash(createUserDto.password)

    const createdUser = new this.userModel(createUserDto)
    createdUser.save()

    return { statusCode: HttpStatus.OK, message: 'Successfully signed up' }
  }

  // User Login
  async signin(authDto: AuthDto, response: Response): Promise<IEnpointResponse> {
    const user = await this.userModel.findOne({ email: authDto.email })
    if (!user) throw new NotFoundException('User not found')

    const isValid = await verify(user.password, authDto.password)
    if (!isValid) throw new UnauthorizedException('Invalid credentials')

    const jwt = await this.jwtServise.signAsync({ id: user._id })

    response.cookie('jwt', jwt)

    return { statusCode: HttpStatus.OK, message: 'Successfully signed in', jwt }
  }

  // User Logout
  async signout(response: Response) {
    response.clearCookie('jwt')

    return { message: 'Successfully signed out' }
  }

}
