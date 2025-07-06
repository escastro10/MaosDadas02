// D:\Projetos\MaosDadas\backend-fieb-main\src\seeds\areas.ts

import { PrismaClient } from '@prisma/client';

// Encapsule toda a lógica do seed em uma função exportada
export async function seedAreas(prisma: PrismaClient) { // <-- MUDANÇA AQUI: `export async function` e recebendo `prisma`
    console.log('Iniciando o seeding de Áreas...');

    const areas = [
        { name: 'Conselhos Temáticos', iconName: 'PiChalkboardTeacher' },
        { name: 'Impactos Econômicos', iconName: 'GiReceiveMoney' },
        // Adicione outras áreas se desejar
        { name: 'Saúde e Segurança do Trabalho', iconName: 'GiHealthCapsule' } // Exemplo de área que estava sendo filtrada em categories.ts
    ];

    const periodIds = await prisma.period.findMany({
        select: {
            id: true,
        }
    });

    function createSlug(name: string): string {
        return name
            .toLowerCase()
            .normalize('NFD') // Normaliza o texto para decompor caracteres especiais
            .replace(/[̀-ͯ]/g, '') // Remove os diacríticos (acentos)
            .replace(/\s+/g, '-') // Substitui espaços por hifens
            .replace(/[^\w-]+/g, '') // Remove caracteres especiais restantes
            .replace(/--+/g, '-') // Substitui múltiplos hifens por um único
            .replace(/^-+/, '') // Remove hifens no início
            .replace(/-+$/, ''); // Remove hifens no final
    }

    const data = periodIds.flatMap(periodId =>
        areas.map(area => ({
            name: area.name,
            slug: createSlug(area.name),
            iconName: area.iconName,
            periodId: periodId.id,
        }))
    );

    await prisma.area.createMany({
        data,
        // skipDuplicates: true, // Adicionado para evitar erros se a área já existir
    });
    console.log('Seeding de Áreas concluído.'); // Adicione um log
}

// REMOVA O BLOCO ABAIXO INTEIRO, SE ELE EXISTIR NO SEU ARQUIVO!
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