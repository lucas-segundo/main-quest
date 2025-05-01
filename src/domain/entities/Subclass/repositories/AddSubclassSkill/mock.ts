import { AddSubclassSkillRepository } from '.'

export const mockAddSubclassSkillRepository =
  (): jest.Mocked<AddSubclassSkillRepository> => ({
    add: jest.fn(),
  })
