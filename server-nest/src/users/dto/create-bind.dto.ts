import { IsString } from "class-validator"

export class CreateBindDto {
  @IsString()
  userId: string

  @IsString()
  bindedUserId: string
}