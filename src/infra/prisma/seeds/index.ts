import prisma from '..'
import { DBSeeder } from './DBSeeder'

async function main() {
  console.log('Start seeding...')
  const dbSeeder = new DBSeeder()

  for (let i = 0; i < 10; i++) {
    const data = await dbSeeder.seed()
    console.log(`Seeding iteration ${i + 1} finished:`, data)
  }

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
