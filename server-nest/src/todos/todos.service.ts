import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { Todo, TodoDocument } from './schemas/todo.schema'
import { UserEntity } from 'src/users/entities/user.entity'

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) { }

  async create(createTodoDto: CreateTodoDto, user: UserEntity): Promise<Todo> {
    //const userId: string = parseJwt(request.cookies['jwt'])

    createTodoDto.userId = user.id

    const createdCat = new this.todoModel(createTodoDto)
    return createdCat.save()
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec()
  }

  async findById(id: string): Promise<Todo> {
    return this.todoModel.findById(id)
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, user: UserEntity): Promise<Todo> {
    return this.todoModel.findOneAndUpdate({ _id: id, userId: user.id }, updateTodoDto, { new: true })
  }

  async remove(id: string, user: UserEntity): Promise<Todo> {
    return this.todoModel.findOneAndRemove({ _id: id, userId: user.id })
  }

  async findByUser(user: UserEntity): Promise<Todo[]> {
    return this.todoModel.find({ userId: user.id }).exec()
  }
}

// function parseJwt(jwt: string): string {
//   return JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString())?.id
// }