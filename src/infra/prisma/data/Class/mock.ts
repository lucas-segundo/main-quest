import { faker } from '@faker-js/faker'
import { PrismaClass } from '.'
import { mockPrismaSubclass } from '../Subclass/mock'

export const mockPrismaClass = (): PrismaClass => ({
  id: faker.number.int(),
  name: faker.lorem.word(),
  subclasses: [mockPrismaSubclass()],
})
