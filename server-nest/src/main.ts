import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())
  app.enableCors({
    origin: '*',
    credentials: true
  })

  await app.listen(process.env.PORT || 4200)

  // Create a logger instance
  const logger = new Logger('Main')
  logger.log(`Server is running on: ${await app.getUrl()}`)
}

bootstrap()
