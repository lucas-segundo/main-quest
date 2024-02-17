import { mockCharacterClassCreaterRepo } from 'app/interfaces/CharacterClassCreaterRepository/mock'
import { CharacterClassCreaterImpl } from '.'
import { CharacterClassCreaterParams } from 'domain/useCases/CharacterClassCreater'
import { faker } from '@faker-js/faker'
import { CharacterClassCreaterRepoParams } from 'app/interfaces/CharacterClassCreaterRepository'
import { mockCharacterClass } from 'domain/entities/CharacterClass/mock'

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

  it('should return created character class', async () => {
    const { sut, repository } = makeSUT()

    const params: CharacterClassCreaterParams = {
      name: faker.lorem.word(),
    }
    const createdCharacterClass = { ...mockCharacterClass(), name: params.name }
    repository.create.mockResolvedValue(createdCharacterClass)
    const characterClass = await sut.create(params)

    expect(characterClass).toEqual(createdCharacterClass)
  })
})
