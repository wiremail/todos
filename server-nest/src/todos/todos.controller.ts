import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common'
import { TodosService } from './todos.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { User } from 'src/auth/user.decorator'
import { UserEntity } from 'src/users/entities/user.entity'

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createTodoDto: CreateTodoDto, @User() user: UserEntity) {
    return this.todosService.create(createTodoDto, user)
  }

  @Get()
  findAll() {
    return this.todosService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findById(id)
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @User() user: UserEntity) {
    return this.todosService.update(id, updateTodoDto, user)
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @User() user: UserEntity) {
    return this.todosService.remove(id, user)
  }

  @Get('/user/:id')
  @UseGuards(AuthGuard)
  findByUser(@User() user: UserEntity) {
    return this.todosService.findByUser(user)
  }
}
