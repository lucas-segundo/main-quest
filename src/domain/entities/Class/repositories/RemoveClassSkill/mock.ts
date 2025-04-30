import { RemoveClassSkillRepository, RemoveClassSkillRepositoryParams } from '.'

export const mockRemoveClassSkillRepositoryParams =
  (): RemoveClassSkillRepositoryParams => ({
    include: {
      skills: true,
    },
  })

export const mockRemoveClassSkillRepository =
  (): jest.Mocked<RemoveClassSkillRepository> => ({
    remove: jest.fn(),
  })
