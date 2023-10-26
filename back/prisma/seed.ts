import prisma from "../src/utils/prisma";

type User = {
  names: string;
  lastnames: string;
  email: string;
  birthdate: Date;
  cuit: string;
  cellphone: string;
  address: string;
};

const seedUsers = (): User[] => {
  return [
    {
      names: "Juan",
      lastnames: "Perez",
      email: "juan.perez@gmali.com",
      birthdate: new Date(),
      cuit: "20-34567890-1",
      cellphone: "123456789",
      address: "Calle falsa 123",
    },
    {
      names: "Pedro",
      lastnames: "Gomez",
      email: "pedro.gomez@gmail.com",
      birthdate: new Date(),
      cuit: "22-34567890-1",
      cellphone: "123456789",
      address: "Calle falsa 123",
    },
    {
      names: "Maria",
      lastnames: "Gonzalez",
      email: "maria.gonzalez@gmail.com",
      birthdate: new Date(),
      cuit: "27-34567890-1",
      cellphone: "123456789",
      address: "Calle falsa 123",
    },
  ];
};

async function seed() {
  await Promise.all(
    seedUsers().map((user) => prisma.user.create({ data: user }))
  );
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
