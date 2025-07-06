// D:\Projetos\MaosDadas\backend-fieb-main\src\seeds\categories.ts

import { PrismaClient } from '@prisma/client';

// Encapsule a lógica em uma função exportada
export async function seedCategories(prisma: PrismaClient) { // <-- MUDANÇA AQUI
    console.log('Iniciando o seeding de Categorias...');

    const start = performance.now()

    const categories = [
        { name: 'Campanha de vacinação contra a gripe' },
    ]

    // Ajustei o nome da área para corresponder ao que é semeado em areas.ts
    // Se "Saúde e Segurança do Trabalho" não for um nome fixo, considere buscar por slug ou ID de forma mais robusta.
    const areasId = await prisma.area.findMany({
        where: {
            name: 'Saúde e Segurança do Trabalho' // Certifique-se que esta área existe ou ajuste o nome/filtro
        },
        select: {
            id: true
        }
    })

    const data = areasId.flatMap(areaId =>
        categories.map(category => ({
            name: category.name,
            areaId: areaId.id
        }))
    )

    const ok = await prisma.category.createMany({
        data,
        // skipDuplicates: true // Adicionado para evitar erros em execuções repetidas
    })


    if (ok) {
        console.log('✓ [SUCCESS] - Categorias criadas com sucesso!');
    } else {
        console.log('Erro ao criar categorias'); // Este bloco de erro pode não ser acionado pelo createMany
    }

    const end = performance.now()

    const executionTimeInSeconds = ((end - start) / 1000).toFixed(2);
    console.log(`Tempo de execução de Categorias: ${executionTimeInSeconds}s`);
}

// REMOVA O BLOCO ABAIXO (main().catch()) DESTE ARQUIVO!
/*
main()
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
*/