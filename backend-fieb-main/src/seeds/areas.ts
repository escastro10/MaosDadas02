import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const areas = [
        { name: 'Conselhos Temáticos', iconName: 'PiChalkboardTeacher' },
        { name: 'Impactos Econômicos', iconName: 'GiReceiveMoney' },

    ];

    const periodIds = await prisma.period.findMany({
        select: {
            id: true,
        }
    })

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
        data
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
