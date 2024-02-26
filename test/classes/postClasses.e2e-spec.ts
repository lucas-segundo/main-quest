import { mockCharacterClassCreaterParams } from 'domain/useCases/CharacterClassCreater/mock'
import * as request from 'supertest'

describe('POST /classes', () => {
  it('should create a new class and return it', () => {
    const body = mockCharacterClassCreaterParams()

    return request(process.env.API_BASE_URL)
      .post('/classes')
      .send(body)
      .expect((res) => {
        const { data } = res.body
        expect(data).toHaveProperty('id')
        expect(data).toMatchObject(body)
      })
  })
})
