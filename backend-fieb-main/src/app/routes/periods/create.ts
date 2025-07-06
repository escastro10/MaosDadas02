import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function createPeriod(app: FastifyInstance) {

    const schema = z.object({
        year: z.number(),
        open: z.boolean().optional(),
        cloneFromPeriodId: z.string().optional(), // Adiciona o campo para clonar de um período existente
    });

    app.post("/period", async (req, res) => {
        const { year, cloneFromPeriodId } = schema.parse(req.body);

        const periodExists = await prisma.period.findFirst({
            where: {
                year
            }
        });

        if (periodExists) {
            return res.status(400).send({ message: 'Period already exists' });
        }

        const newPeriod = await prisma.period.create({
            data: {
                year,
                open: true,
            },
        });

        // Fetch the previous period data if cloneFromPeriodId is provided
        let previousPeriod;
        if (cloneFromPeriodId) {
            previousPeriod = await prisma.period.findUnique({
                where: { id: cloneFromPeriodId },
                include: {
                    areas: {
                        include: {
                            categories: {
                                include: {
                                    indicadores: true,
                                },
                            },
                        },
                    },
                },
            });

            if (!previousPeriod) {
                return res.status(404).send({ message: 'Previous period not found' });
            }
        }

        // Criação das áreas, categorias e indicadores
        for (const area of previousPeriod.areas) {
            const newArea = await prisma.area.create({
                data: {
                    name: area.name,
                    slug: area.slug,
                    iconName: area.iconName,
                    periodId: newPeriod.id,
                },
            });

            for (const category of area.categories) {
                const newCategory = await prisma.category.create({
                    data: {
                        name: category.name,
                        areaId: newArea.id,
                    },
                });

                for (const indicador of category.indicadores) {
                    await prisma.indicador.create({
                        data: {
                            pergunta: indicador.pergunta,
                            value: indicador.value,
                            type: indicador.type,
                            qualitativo: indicador.qualitativo,
                            question: indicador.question,
                            isHide: indicador.isHide,
                            draft: indicador.draft,
                            isPriority: indicador.isPriority,
                            hasUpload: indicador.hasUpload,
                            operation: indicador.operation,
                            categoryId: newCategory.id,
                        },
                    });
                }
            }
        }

        return res.status(201).send(newPeriod);
    });
}
