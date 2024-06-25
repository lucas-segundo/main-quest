import { SubclassCreaterRepo, SubclassCreaterRepoParams } from '.'
import { mockSubclassCreaterParams } from 'domain/useCases/SubclassCreater/mock'

export const mockSubclassCreaterRepoParams = (): SubclassCreaterRepoParams => ({
  ...mockSubclassCreaterParams(),
})

export const mockSubclassCreaterRepo =
  (): jest.Mocked<SubclassCreaterRepo> => ({
    create: jest.fn(),
  })
