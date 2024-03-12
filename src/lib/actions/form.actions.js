'use server';

import prisma from '@/db/client.js';
import { currentUser } from '@clerk/nextjs';

class UserNotFoundErr extends Error {
  constructor() {
    super('User not found');
    this.name = 'UserNotFoundErr';
  }
}

const getCurrentUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  return user;
};

export async function getForms() {
  try {
    const user = await getCurrentUser();
    const forms = await prisma.form.findMany({
      where: {
        userId: user.id,
      },
    });

    return forms || [];
  } catch (error) {
    console.error(error);
    throw new Error('Unable to fetch forms');
  }
}

export async function getFormById(id) {
  try {
    if (!id) {
      throw new Error('Invalid form id');
    }
    const form = await prisma.form.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!form) {
      throw new Error('Form not found');
    }

    return form;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to fetch form');
  }
}

export async function createForm(newForm) {
  try {
    const user = await getCurrentUser();
    const form = await prisma.form.create({
      data: {
        title: newForm.title,
        fields: newForm.fields,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return form;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to create form');
  }
}

export async function updateFormContent(id, elements) {
  try {
    const form = await prisma.form.update({
      where: {
        id: Number(id),
      },
      data: {
        fields: JSON.stringify(elements),
      },
    });

    if (!form) {
      throw new Error('Unable to update form');
    }

    return form;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to update form');
  }
}
