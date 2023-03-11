import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ example: 'John', description: 'Username' })
  @Prop({ required: true, unique: true })
  name: string

  @ApiProperty({ example: 'email@email.com', description: 'User email' })
  @Prop({ required: true, unique: true })
  email: string

  @ApiProperty({ example: 'xft56D5e*5k', description: 'User password' })
  @Prop({ required: true })
  password: string

  @ApiProperty({ example: 'admin', description: 'User role' })
  @Prop({ default: ['user'] })
  roles: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)