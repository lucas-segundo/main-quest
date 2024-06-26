import { faker } from '@faker-js/faker'
import { SubclassCreater, SubclassCreaterParams } from '.'

export const mockSubclassCreaterParams = (): SubclassCreaterParams => ({
  name: faker.person.firstName(),
})

export const mockSubclassCreater = (): SubclassCreater => new SubclassCreater()
