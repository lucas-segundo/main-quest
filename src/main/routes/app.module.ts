import { Module } from '@nestjs/common'
import { ClassesModule } from './classes/classes.module'
import { SubclassesModule } from './subclasses/subclasses.module'

@Module({
  imports: [ClassesModule, SubclassesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
