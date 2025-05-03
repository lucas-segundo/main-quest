import { PrismaUpdateCharacterRepository } from './prisma'

export const makeUpdateCharacterRepository =
  (): PrismaUpdateCharacterRepository => {
    return new PrismaUpdateCharacterRepository()
  }
