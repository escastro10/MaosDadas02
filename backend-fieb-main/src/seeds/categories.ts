import { prisma } from "../lib/prisma";





async function main() {


    const start = performance.now()

    const categories = [
        { name: 'Campanha de vacinação contra a gripe' },

    ]

    const areasId = await prisma.area.findMany({
        where: {
            name: 'Saúde e Segurança do Trabalho'
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
        data
    })


    if (ok) {
        console.log('Categorias criadas com sucesso')
    } else {
        console.log('Erro ao criar categorias')
    }



    const end = performance.now()

    const executionTimeInSeconds = ((end - start) / 1000).toFixed(2);
    console.log(`Tempo de execução: ${executionTimeInSeconds}s`);

}

main()
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

