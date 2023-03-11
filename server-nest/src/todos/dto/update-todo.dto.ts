import { PartialType } from '@nestjs/mapped-types'
import { CreateTodoDto } from './create-todo.dto'

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  title: string
  description: string
  userId: string
  isCompleted: boolean
}
