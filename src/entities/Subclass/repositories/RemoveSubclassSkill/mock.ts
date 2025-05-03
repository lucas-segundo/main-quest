import { RemoveSubclassSkillRepository } from '.'

export const mockRemoveSubclassSkillRepository =
  (): jest.Mocked<RemoveSubclassSkillRepository> => ({
    remove: jest.fn(),
  })
