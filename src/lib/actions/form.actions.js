'use server';

import prisma from '@/db/client.js';
import { auth } from '@clerk/nextjs';

export async function getForms() {
  const { userId } = auth();
  try {
    if (!userId) {
      throw new Error('Error: User not found');
    }
    const forms = await prisma.form.findMany({
      where: {
        userId: userId,
      },
    });

    return forms || [];
  } catch (error) {
    console.error('Error getting forms:', error);
    throw error;
  }
}

export async function getFormById(id) {
  if (!id) {
    throw new Error('Error: Invalid form id');
  }
  try {
    const form = await prisma.form.findUnique({
      where: {
        id: Number(id),
      },
    });

    return form;
  } catch (error) {
    console.error('Error getting form by id:', error);
    throw error;
  }
}

export async function createForm(newForm) {
  const { userId } = auth();

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error('Error: User not found');
  }
  try {
    const form = await prisma.form.create({
      data: {
        title: newForm.title,
        fields: newForm.fields,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return form;
  } catch (error) {
    console.error('Error creating form:', error);
    throw error;
  }
}

// export async function updateForm(req, res) {
//   try {
//     const form = await prisma.form.update({
//       where: {
//         id: req.body.id,
//       },
//       data: {
//         name: req.body.name,
//         description: req.body.description,
//         fields: req.body.fields,
//       },
//     });
//     res.status(200).json(form);
//   } catch (error) {
//     console.error('Error updating form:', error);
//     res.status(400).send('Error: Invalid form data');
//   }
// }

// export async function deleteForm(req, res) {
//   try {
//     const form = await prisma.form.delete({
//       where: {
//         id: req.body.id,
//       },
//     });
//     res.status(200).json(form);
//   } catch (error) {
//     console.error('Error deleting form:', error);
//     res.status(400).send('Error: Invalid form data');
//   }
// }
