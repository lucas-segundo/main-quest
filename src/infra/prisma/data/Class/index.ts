import { PrismaSubclass } from '../Subclass'

export interface PrismaClass {
  id: number
  name: string
  subclasses: PrismaSubclass[]
}
