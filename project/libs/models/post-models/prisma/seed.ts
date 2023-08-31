import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: '1',
      type: 'VIDEO',
      contentId: 1,
      tags: {
        create: [
            {
              tag: '#'
            },
            {
              tag: '#'
            },
        ]
      }
    }
  });
  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
