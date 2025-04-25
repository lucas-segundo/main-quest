import { faker } from '@faker-js/faker'
import { CreateSkillRepository, CreateSkillRepositoryParams } from '.'

export const mockCreateSkillRepositoryParams =
  (): CreateSkillRepositoryParams => ({
    name: faker.commerce.productName(),
  })

export const mockCreateSkillRepository =
  (): jest.Mocked<CreateSkillRepository> => ({
    create: jest.fn(),
  })
