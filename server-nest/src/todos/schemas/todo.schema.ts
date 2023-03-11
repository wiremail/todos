import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TodoDocument = HydratedDocument<Todo>

@Schema({ timestamps: true })
export class Todo {
  @Prop()
  title: string

  @Prop()
  description: string

  @Prop()
  userId: string

  @Prop({ default: false })
  isCompleted: boolean
}

export const TodoSchema = SchemaFactory.createForClass(Todo)