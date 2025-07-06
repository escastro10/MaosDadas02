// D:\Projetos\MaosDadas\backend-fieb-main\src\seeds\periods.ts

import { PrismaClient } from '@prisma/client';

// Altere a função 'main' para ser uma função exportada
export async function seedPeriods(prisma: PrismaClient) { // <-- MUDANÇA AQUI
    const currentYear = new Date().getFullYear();
    const periods = [
        { year: currentYear, isActive: true },
        { year: currentYear - 1, isActive: false },
        { year: currentYear - 2, isActive: false },
    ];

    await prisma.period.createMany({
        data: periods,
        
    });
    console.log('Seeding de Períodos concluído.'); // Adicione um log
}

// REMOVA O BLOCO ABAIXO (main().then().catch()) DESTE ARQUIVO!
/*
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
*/