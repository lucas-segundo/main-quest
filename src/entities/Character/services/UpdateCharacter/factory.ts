import { PrismaUpdateCharacterService } from './prisma'

export const makeUpdateCharacterService = (): PrismaUpdateCharacterService => {
  return new PrismaUpdateCharacterService()
}
