import { faker } from '@faker-js/faker'
import { Controller, HTTPErrorResponse, HTTPResponse } from '.'

export const mockControllerHTTPErrorResponse = (): HTTPErrorResponse => ({
  errors: [faker.lorem.words(), faker.lorem.words()],
  statusCode: faker.internet.httpStatusCode(),
})

export const mockControllerHTTPResponse = (): HTTPResponse => ({
  data: {
    [faker.database.column()]: faker.lorem.words(),
  },
  statusCode: faker.internet.httpStatusCode(),
})

export const mockController = (): jest.Mocked<Controller> => ({
  handle: jest.fn(),
})
