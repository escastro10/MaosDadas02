import { prisma } from "../lib/prisma";


async function main() {

    await prisma.period.createMany({
        data: [
            {
                year: 2023,
            },
            {
                year: 2022,
            },
            {
                year: 2021,
            },
            {
                year: 2020,
            },
            {
                year: 2019,
            },
            {
                year: 2018,
            },
            {
                year: 2017,
            },
            {
                year: 2016,
            },
            {
                year: 2015,
            },
            {
                year: 2014,
            },
            {
                year: 2013,
            },
            {
                year: 2012,
            },
            {
                year: 2011
            }
        ]
    })

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

