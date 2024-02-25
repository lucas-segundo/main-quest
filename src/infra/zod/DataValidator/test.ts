import { z } from 'zod'
import { ZodDataValidator } from '.'
import { faker } from '@faker-js/faker'

const makeSUT = () => {
  const schema = z.object({
    name: z.string(),
  })
  const sut = new ZodDataValidator(schema)

  return { sut, schema }
}

describe('ZodDataValidator', () => {
  it('should call zod with right params', async () => {
    const { sut, schema } = makeSUT()

    const parseSpy = jest.spyOn(schema, 'parseAsync')

    const data = {
      name: faker.person.fullName(),
    }
    await sut.validate(data)

    expect(parseSpy).toHaveBeenCalledWith(data)
  })

  it('should return empty errors if validation succeeds', async () => {
    const { sut, schema } = makeSUT()

    const data = {
      name: faker.person.fullName(),
    }
    schema.parseAsync = jest.fn().mockResolvedValue(data)
    const result = await sut.validate(data)

    expect(result.errors).toEqual([])
  })
})
