import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type BindDocument = HydratedDocument<Bind>

@Schema()
export class Bind {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  bindedUserId: string
}

export const BindSchema = SchemaFactory.createForClass(Bind)