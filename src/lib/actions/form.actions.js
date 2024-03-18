'use server';

import prisma from '@/db/client.js';
import { currentUser } from '@clerk/nextjs';

class UserNotFoundErr extends Error {
  constructor() {
    super('User not found');
    this.name = 'UserNotFoundErr';
  }
}

class InvalidFormIdErr extends Error {
  constructor() {
    super('Invalid form id');
    this.name = 'InvalidFormIdErr';
  }
}

class FormNotFoundErr extends Error {
  constructor() {
    super('Form not found');
    this.name = 'FormNotFoundErr';
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
  } finally {
    await prisma.$disconnect();
  }
}

export async function getFormById(id) {
  try {
    if (!id) {
      throw new InvalidFormIdErr();
    }
    const form = await prisma.form.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!form) {
      throw new FormNotFoundErr();
    }

    form.fields = JSON.parse(form.fields);

    return form;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to fetch form');
  } finally {
    await prisma.$disconnect();
  }
}

export async function createForm(newForm) {
  try {
    const user = await getCurrentUser();
    const form = await prisma.form.create({
      data: {
        userId: user.id,
        title: newForm.title,
        fields: newForm.fields,
      },
    });

    return form;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to create form');
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateFormTitle(id, title) {
  try {
    const form = await prisma.form.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
      },
    });

    if (!form) {
      throw new FormNotFoundErr();
    }

    return form;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to update form');
  } finally {
    await prisma.$disconnect();
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
      throw new FormNotFoundErr();
    }

    return form;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to update form');
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteForm(id) {
  try {
    const form = await prisma.form.delete({
      where: {
        id: Number(id),
      },
    });

    if (!form) {
      throw new FormNotFoundErr();
    }

    return form;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to delete form');
  } finally {
    await prisma.$disconnect();
  }
}
