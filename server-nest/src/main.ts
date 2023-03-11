import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())
  app.enableCors({
    origin: '*',
    credentials: true
  })

  const config = new DocumentBuilder()
    .setTitle('Todos')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(process.env.PORT || 4200)

  // Create a logger instance
  const logger = new Logger('Main')
  logger.log(`Server is running on: ${await app.getUrl()}`)
}

bootstrap()
