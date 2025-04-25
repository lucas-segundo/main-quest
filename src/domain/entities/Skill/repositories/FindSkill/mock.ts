import { faker } from '@faker-js/faker'
import { FindSkillRepository, FindSkillRepositoryParams } from '.'

export const mockFindSkillRepositoryParams = (): FindSkillRepositoryParams => ({
  filter: {
    id: {
      equals: faker.string.uuid(),
    },
  },
})

export const mockFindSkillRepository =
  (): jest.Mocked<FindSkillRepository> => ({
    find: jest.fn(),
  })
