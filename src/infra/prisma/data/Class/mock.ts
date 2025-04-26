import { faker } from '@faker-js/faker'
import { PrismaClass } from '.'
import { mockPrismaSubclass } from '../Subclass/mock'
import { mockPrismaClassesSkills } from '../ClassesSkills/mock'

export const mockPrismaClass = (): PrismaClass => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  name: faker.lorem.word(),
  subclasses: [mockPrismaSubclass()],
  classesSkills: [mockPrismaClassesSkills()],
})
