import { faker } from '@faker-js/faker'
import { Controller, HTTPResponse } from '.'

export const mockControllerHTTPResponse = (): HTTPResponse => ({
  data: {
    [faker.database.column()]: faker.lorem.words(),
  },
  statusCode: faker.internet.httpStatusCode(),
})

export const mockController = (): jest.Mocked<Controller> => ({
  handle: jest.fn(),
})
