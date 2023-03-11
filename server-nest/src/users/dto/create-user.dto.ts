import { IsEmail, IsOptional, IsString, MinLength } from "class-validator"

export class CreateUserDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @MinLength(6, {
    message: 'Password must be at least 6 characters long'
  })
  @IsString()
  password: string

  @IsOptional()
  roles: string[]
}
