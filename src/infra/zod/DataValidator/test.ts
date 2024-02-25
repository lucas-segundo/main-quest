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
})
