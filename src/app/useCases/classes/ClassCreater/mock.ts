import { faker } from '@faker-js/faker'
import { ClassCreater, ClassCreaterParams } from '.'
import { mockClassCreaterRepo } from 'app/repositories/classes/ClassCreaterRepo/mock'
import { mockErrorLoggerRepo } from 'app/repositories/loggers/ErrorLoggerRepo/mock'

export const mockClassCreaterParams = (): ClassCreaterParams => ({
  name: faker.person.firstName(),
})

export const mockClassCreater = (): ClassCreater =>
  new ClassCreater(mockClassCreaterRepo(), mockErrorLoggerRepo())
