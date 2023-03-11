import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose"

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) { }

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.get<string>('DB_URI'),
      authSource: "admin",
      user: this.configService.get<string>('DB_USER'),
      pass: this.configService.get<string>('DB_PASSWORD'),
      useNewUrlParser: true,
      autoIndex: true,
      useUnifiedTopology: true
    }
  }
}
