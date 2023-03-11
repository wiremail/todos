import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export type TodoDocument = HydratedDocument<Todo>

@Schema({ timestamps: true })
export class Todo {
  @ApiProperty({ example: 'Do something', description: 'Todo Title' })
  @Prop()
  title: string

  @ApiProperty({ example: 'Do something today', description: 'Todo Desctiptions' })
  @Prop()
  description: string

  @ApiProperty({ example: '640ba733e42370580d70da0c', description: 'Todo Owner' })
  @Prop()
  userId: string

  @ApiProperty({ example: 'true', description: 'Todo State' })
  @Prop({ default: false })
  isCompleted: boolean
}

export const TodoSchema = SchemaFactory.createForClass(Todo)