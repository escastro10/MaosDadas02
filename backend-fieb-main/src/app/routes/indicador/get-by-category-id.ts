import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../../../lib/prisma"

export async function getIndicadoresByCategoryId(app: FastifyInstance) {

    const schema = z.object({
        categoryId: z.string(),
    })

    app.get('/indicadores/:categoryId', async (req, res) => {

        const { categoryId } = schema.parse(req.params)

        const indicadores = await prisma.indicador.findMany({
            where: {
                categoryId,
                isHide: false
            },
            orderBy: {
                type: 'asc'
            },
            include: {
                analises_criticas: {
                    include: {
                        messages: true
                    }
                },
                turnoverAcumulado: {
                    include: {
                        indicador: true
                    }
                },
                turnoverMedio: {
                    include: {
                        indicador: true
                    }
                },
                operations: {
                    include: {
                        campos: {
                            include: {
                                indicador: true
                            }
                        }
                    }
                }
            }
        })

        return res.status(200).send(indicadores)
    })
}