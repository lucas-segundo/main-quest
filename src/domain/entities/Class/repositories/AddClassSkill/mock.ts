import { AddClassSkillRepository, AddClassSkillRepositoryParams } from '.'

export const mockAddClassSkillRepositoryParams =
  (): AddClassSkillRepositoryParams => ({
    include: {
      skills: true,
    },
  })

export const mockAddClassSkillRepository =
  (): jest.Mocked<AddClassSkillRepository> => ({
    add: jest.fn(),
  })
