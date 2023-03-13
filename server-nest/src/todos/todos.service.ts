import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
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
    createTodoDto.userId = user.id

    const createdCat = new this.todoModel(createTodoDto)
    return createdCat.save()
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec()
  }

  async findById(id: string): Promise<Todo> {
    const todo = this.todoModel.findById(id)
    if (!todo) {
      throw new HttpException('Todo NOT Found', HttpStatus.NOT_FOUND)
    }
    return todo
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, user: UserEntity): Promise<Todo> {
    return this.todoModel.findOneAndUpdate({ _id: id, userId: user.id }, updateTodoDto, { new: true })
  }

  async remove(id: string, user: UserEntity): Promise<Todo> {
    return this.todoModel.findOneAndRemove({ _id: id, userId: user.id })
  }

  async findByUser(page: string, user: UserEntity): Promise<Todo[]> {
    const limit = 5
    const skip = page ? (+page - 1) * limit : 0

    const todos = this.todoModel.find({ userId: user.id }).skip(skip).limit(limit).exec()
    if (!todos) {
      throw new HttpException('Todos NOT Found', HttpStatus.NOT_FOUND)
    }
    return todos
  }

  async countUserDocs(user: UserEntity): Promise<number> {
    const count = await this.todoModel.countDocuments({ userId: user.id }).exec()
    return count
  }
}