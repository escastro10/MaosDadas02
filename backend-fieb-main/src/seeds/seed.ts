// D:\Projetos\MaosDadas\backend-fieb-main\src\seeds\seed.ts

import { PrismaClient } from '@prisma/client'; // Importar PrismaClient para tipagem
import { prisma } from '../lib/prisma'; // Importa a instância do Prisma Client
import { seedAreas } from '../seeds/areas'; // Importa a função de seed para áreas (agora exportada!)
import { seedCategories } from '../seeds/categories'; // Importa a função de seed para categorias
import { seedIndicadores } from '../seeds/indicadores'; // Importa a função de seed para indicadores
import { seedPeriods } from '../seeds/periods'; // Importa a função de seed para períodos

async function main() {
  console.log('Iniciando o seeding do banco de dados...');

  try {
    // A ordem é importante para seeds com dependências
    await seedPeriods(prisma); // Periodos geralmente não têm dependências
    await seedAreas(prisma);   // Áreas podem depender de períodos
    await seedCategories(prisma); // Categorias podem depender de áreas
    await seedIndicadores(prisma); // Indicadores podem depender de áreas e categorias

    console.log('Seeding concluído com sucesso!');
  } catch (error) {
    console.error('Erro durante o seeding:', error);
    process.exit(1);
  } finally {
    // Desconecta do banco de dados UMA VEZ ao finalizar o processo principal de seed
    await prisma.$disconnect();
  }
}

main();