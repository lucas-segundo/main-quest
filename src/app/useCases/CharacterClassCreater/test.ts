import { mockCharacterClassCreaterRepo } from 'app/interfaces/CharacterClassCreaterRepository/mock'
import { CharacterClassCreaterImpl } from '.'
import { CharacterClassCreaterParams } from 'domain/useCases/CharacterClassCreater'
import { faker } from '@faker-js/faker'
import { CharacterClassCreaterRepoParams } from 'app/interfaces/CharacterClassCreaterRepository'

const makeSUT = () => {
  const repository = mockCharacterClassCreaterRepo()
  const sut = new CharacterClassCreaterImpl(repository)

  return { sut, repository }
}

describe('CharacterClassCreaterImpl', () => {
  it('should call repository with right params', () => {
    const { sut, repository } = makeSUT()

    const params: CharacterClassCreaterParams = {
      name: faker.lorem.word(),
    }
    sut.create(params)

    const expectedParams: CharacterClassCreaterRepoParams = {
      name: params.name,
    }
    expect(repository.create).toHaveBeenCalledWith(expectedParams)
  })
})
