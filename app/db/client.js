import { PrismaClient } from '@prisma/client';

let prisma;

// Se verifica si la aplicación está en un entorno de producción
if (process.env.NODE_ENV === 'production') {
  // En producción, se quiere crear una nueva instancia de PrismaClient
  prisma = new PrismaClient();
} else {
   // En desarrollo, se quiere evitar múltiples instancias de PrismaClient
  // por lo que se verifica si ya existe una en el objeto global
  if (!global.prisma) {
    // Si no existe, se crea una nueva instancia y se asigna al objeto global
    global.prisma = new PrismaClient();
  }
  // Se asigna la instancia de PrismaClient del objeto global a la variable prisma
  prisma = global.prisma;
}

export default prisma;