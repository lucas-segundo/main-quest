import { RemoveClassSkillRepository } from '.'

export const mockRemoveClassSkillRepository =
  (): jest.Mocked<RemoveClassSkillRepository> => ({
    remove: jest.fn(),
  })
