import { prisma } from "../lib/prisma";




async function main() {

    const start = performance.now()

    const categoryNames = ['Evolução do quadro de funcionários por Entidade/Ano (regidos pela CLT)']

    const categoriesId = await prisma.category.findMany({
        where: {
            name: {
                in: categoryNames
            }
        },
        select: {
            id: true
        }
    })


    const data = categoriesId.flatMap(categoryId =>

        [
            {
                categoryId: categoryId.id,
                pergunta: 'Força de trabalho efetiva FIEB',
                type: 'quantitativo',
            },
            {
                categoryId: categoryId.id,
                pergunta: 'Efetivo FIEB sem CTD',
                type: 'quantitativo'
            },
            {
                categoryId: categoryId.id,
                pergunta: 'FIEB - Saída no exercício (desligamentos)',
                type: 'quantitativo'
            },
            {
                categoryId: categoryId.id,
                pergunta: 'SESI - Entrada no exercício(contratações)',
                type: 'quantitativo'
            },
            {
                categoryId: categoryId.id,
                pergunta: 'Força de trabalho efetiva SENAI',
                type: 'quantitativo'
            },
            {
                categoryId: categoryId.id,
                pergunta: 'Efetivo SENAI sem CTD',
                type: 'quantitativo'
            },
            {
                categoryId: categoryId.id,
                pergunta: 'SENAI - Entrada no exercício (contratações)',
                type: 'quantitativo'
            },
            {
                categoryId: categoryId.id,
                pergunta: 'SENAI - Saída no exercício (desligamentos)',
                type: 'quantitativo'
            },
            {
                categoryId: categoryId.id,
                pergunta: 'Força de trabalho efetiva IEL',
                type: 'quantitativo'
            },
            {
                categoryId: categoryId.id,
                pergunta: 'Efetivo IEL sem CTD',
                type: 'quantitativo'
            },
            {
                categoryId: categoryId.id,
                pergunta: 'IEL - Entrada no exercício (contratações)',
                type: 'quantitativo'
            },
            {
                categoryId: categoryId.id,
                pergunta: 'IEL - Saída no exercício (desligamentos)',
                type: 'quantitativo'
            },
            {
                categoryId: categoryId.id,
                pergunta: 'Força de trabalho efetiva CIEB',
                type: 'quantitativo'
            },
            {
                categoryId: categoryId.id,
                pergunta: 'Efetivo CIEB sem CTD',
                type: 'quantitativo'
            },
            {
                categoryId: categoryId.id,
                pergunta: 'CIEB - Entrada no exercício (contratações)',
                type: 'quantitativo'
            },
            {
                categoryId: categoryId.id,
                pergunta: 'CIEB - Saída no exercício (desligamentos)',
                type: 'quantitativo'
            },
            {
                categoryId: categoryId.id,
                pergunta: 'Força de trabalho efetiva S. FIEB',
                type: 'adicao'
            }

        ]
    )

    const ok = await prisma.indicador.createMany({
        data
    })

    if (ok) {
        console.log('✓ [SUCCESS] - Indicadores criados com sucesso!');
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
