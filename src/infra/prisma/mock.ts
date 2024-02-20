import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'
import prisma from '.'

jest.mock('.', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

export const mockedPrismaClient =
  prisma as unknown as DeepMockProxy<PrismaClient>

beforeEach(() => {
  mockReset(mockedPrismaClient)
})
