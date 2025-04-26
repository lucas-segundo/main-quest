import { faker } from '@faker-js/faker'
import { FindSkillsRepository, FindSkillsRepositoryParams } from '.'

export const mockFindSkillsRepositoryParams =
  (): FindSkillsRepositoryParams => ({
    filter: {
      name: {
        like: faker.lorem.words(3),
      },
      classID: {
        equals: faker.string.uuid(),
      },
      subclassID: {
        equals: faker.string.uuid(),
      },
    },
  })

export const mockFindSkillsRepository =
  (): jest.Mocked<FindSkillsRepository> => ({
    find: jest.fn(),
  })
