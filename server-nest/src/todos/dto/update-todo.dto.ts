import { PartialType } from '@nestjs/mapped-types'
import { CreateTodoDto } from './create-todo.dto'
import { IsBoolean, IsNotEmpty, IsOptional, IsString, } from "class-validator"

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsOptional()
  userId: string

  @IsBoolean()
  @IsOptional()
  isCompleted: boolean
}
