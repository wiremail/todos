import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateBindDto } from './dto/create-bind.dto'
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './schemas/user.schema'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @ApiOperation({ summary: 'Get one User by Id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id)
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({ status: 200, type: User })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ status: 200, type: User })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }

  @Post('bind')
  createBind(@Body() createBindDto: CreateBindDto) {
    return this.usersService.createBind(createBindDto)
  }
}
