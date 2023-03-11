import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodosModule } from './todos/todos.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { MongooseConfigService } from './app.db'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/src/.env.${process.env.NODE_ENV}`
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    TodosModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
