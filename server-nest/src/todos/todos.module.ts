import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { TodosService } from './todos.service'
import { TodosController } from './todos.controller'
import { Todo, TodoSchema } from './schemas/todo.schema'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema }
    ]),
    JwtModule.register({
      secret: 'sosecret',
      signOptions: {
        expiresIn: '1d'
      }
    })
  ],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule { }