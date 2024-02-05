const { PrismaClient } = require('@prisma/client');
const faker = require('faker');
const prisma = new PrismaClient();

async function main() {
  // Borra los datos existentes
  await prisma.submission.deleteMany();
  await prisma.field.deleteMany();
  await prisma.form.deleteMany();
  await prisma.user.deleteMany();

  // Siembra nuevos datos
  for (let i = 0; i < 5; i++) {
    await prisma.user.create({
      data: {
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        forms: {
          create: Array.from({ length: 3 }, () => ({
            title: faker.lorem.words(5),
            fields: {
              create: [
                {
                  type: faker.random.arrayElement([
                    'shortAnswer',
                    'longAnswer',
                    'phone',
                    'email',
                    'url',
                  ]),
                  label: faker.lorem.sentence(),
                  options: JSON.stringify({}),
                },
                {
                  type: faker.random.arrayElement([
                    'shortAnswer',
                    'longAnswer',
                    'phone',
                    'email',
                    'url',
                  ]),
                  label: faker.lorem.sentence(),
                  options: JSON.stringify({}),
                },
                {
                  type: faker.random.arrayElement([
                    'shortAnswer',
                    'longAnswer',
                    'phone',
                    'email',
                    'url',
                  ]),
                  label: faker.lorem.sentence(),
                  options: JSON.stringify({}),
                },
              ],
            },
            submissions: {
              create: [
                {
                  answers: JSON.stringify({}),
                },
              ],
            },
          })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
