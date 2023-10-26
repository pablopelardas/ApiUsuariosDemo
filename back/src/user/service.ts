import prisma from "../utils/prisma";

type User = {
  id: number;
  names: string;
  lastnames: string;
  email: string;
  birthdate: Date;
  cuit: string;
  cellphone: string;
  address: string;
};

export const getAll = async (): Promise<User[]> => {
  return await prisma.users.findMany({
    select: {
      id: true,
      names: true,
      lastnames: true,
      email: true,
      birthdate: true,
      cuit: true,
      cellphone: true,
      address: true,
    },
  });
};

export const getById = async (id: number): Promise<User | null> => {
  return await prisma.users.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      names: true,
      lastnames: true,
      email: true,
      birthdate: true,
      cuit: true,
      cellphone: true,
      address: true,
    },
  });
};

export const search = async (query: string): Promise<User[]> => {
  return await prisma.users.findMany({
    where: {
      OR: [
        {
          names: {
            contains: query,
          },
        },
        {
          lastnames: {
            contains: query,
          },
        },
        {
          email: {
            contains: query,
          },
        },
        {
          cuit: {
            contains: query,
          },
        },
        {
          cellphone: {
            contains: query,
          },
        },
        {
          address: {
            contains: query,
          },
        },
      ],
    },
    select: {
      id: true,
      names: true,
      lastnames: true,
      email: true,
      birthdate: true,
      cuit: true,
      cellphone: true,
      address: true,
    },
  });
};

export const insert = async (user: User): Promise<User> => {
  return await prisma.users.create({
    data: {
      names: user.names,
      lastnames: user.lastnames,
      email: user.email,
      birthdate: new Date(user.birthdate),
      cuit: user.cuit,
      cellphone: user.cellphone,
      address: user.address,
    },
    select: {
      id: true,
      names: true,
      lastnames: true,
      email: true,
      birthdate: true,
      cuit: true,
      cellphone: true,
      address: true,
    },
  });
};

export const update = async (id: number, user: User): Promise<User | null> => {
  return await prisma.users.update({
    where: {
      id,
    },
    data: {
      names: user.names,
      lastnames: user.lastnames,
      email: user.email,
      birthdate: user.birthdate,
      cuit: user.cuit,
      cellphone: user.cellphone,
      address: user.address,
    },
    select: {
      id: true,
      names: true,
      lastnames: true,
      email: true,
      birthdate: true,
      cuit: true,
      cellphone: true,
      address: true,
    },
  });
};

export const remove = async (id: number): Promise<User | null> => {
  return await prisma.users.delete({
    where: {
      id,
    },
    select: {
      id: true,
      names: true,
      lastnames: true,
      email: true,
      birthdate: true,
      cuit: true,
      cellphone: true,
      address: true,
    },
  });
};
