import { NestFactory } from '@nestjs/core'
import { AppModule } from './src/main/routes/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()
