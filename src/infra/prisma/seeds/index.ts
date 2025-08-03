import prisma from '..'
import { DBSeeder } from './DBSeeder'

async function main() {
  console.log('Start seeding...')
  const dbSeeder = new DBSeeder()

  await dbSeeder.seed()

  console.log('All seeding operations completed.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
