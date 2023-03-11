import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common'
import { TodosService } from './todos.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { User } from 'src/auth/user.decorator'
import { UserEntity } from 'src/users/entities/user.entity'

import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Todo } from './schemas/todo.schema'

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  @ApiOperation({ summary: 'Create Todo' })
  @ApiResponse({ status: 200, type: Todo })
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createTodoDto: CreateTodoDto, @User() user: UserEntity) {
    return this.todosService.create(createTodoDto, user)
  }

  @ApiOperation({ summary: 'Get All Todos' })
  @ApiResponse({ status: 200, type: [Todo] })
  @Get()
  findAll() {
    return this.todosService.findAll()
  }

  @ApiOperation({ summary: 'Get one Todo by Id' })
  @ApiResponse({ status: 200, type: Todo })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findById(id)
  }

  @ApiOperation({ summary: 'Update Todo' })
  @ApiResponse({ status: 200, type: Todo })
  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @User() user: UserEntity) {
    return this.todosService.update(id, updateTodoDto, user)
  }

  @ApiOperation({ summary: 'Delete Todo' })
  @ApiResponse({ status: 200, type: Todo })
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @User() user: UserEntity) {
    return this.todosService.remove(id, user)
  }

  @ApiOperation({ summary: 'Get all user Todos' })
  @ApiResponse({ status: 200, type: [Todo] })
  @Get('/user/:id')
  @UseGuards(AuthGuard)
  findByUser(@User() user: UserEntity) {
    return this.todosService.findByUser(user)
  }
}
