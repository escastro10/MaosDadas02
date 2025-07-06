import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function getGraphicByIndicador(app: FastifyInstance) {

    const bodySchema = z.object({
        pergunta: z.string()
    })

    app.get('/indicador/graphic/:pergunta', async (req, res) => {

        const { pergunta } = bodySchema.parse(req.params)

        const indicador = await prisma.indicador.findMany({
            where: {
                pergunta: pergunta
            },
            select: {
                pergunta: true,
                value: true,
                category: {
                    select: {
                        area: {
                            select: {
                                period: {
                                    select: {
                                        year: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        indicador.sort((a, b) => a.category.area.period.year - b.category.area.period.year);

        const result = indicador.map(ind => ({
            pergunta: ind.pergunta,
            value: ind.value,
            year: ind.category.area.period.year
        }));

        return res.send(result);



    })

}