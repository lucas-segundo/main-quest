import {
  RemoveSubclassSkillRepository,
  RemoveSubclassSkillRepositoryParams,
} from '.'

export const mockRemoveSubclassSkillRepositoryParams =
  (): RemoveSubclassSkillRepositoryParams => ({
    include: {
      skills: true,
    },
  })

export const mockRemoveSubclassSkillRepository =
  (): jest.Mocked<RemoveSubclassSkillRepository> => ({
    remove: jest.fn(),
  })
