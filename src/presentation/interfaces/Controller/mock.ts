import { faker } from '@faker-js/faker'
import { Controller, HTTPErrorResponse, HTTPResponse } from '.'
import { KnownError } from 'app/errors/KnownError'

export const mockControllerHTTPErrorResponse = (): HTTPErrorResponse => ({
  errors: [new KnownError(faker.lorem.word(), faker.lorem.words())],
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
