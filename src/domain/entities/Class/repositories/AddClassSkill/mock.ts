import { AddClassSkillRepository } from '.'

export const mockAddClassSkillRepository =
  (): jest.Mocked<AddClassSkillRepository> => ({
    add: jest.fn(),
  })
