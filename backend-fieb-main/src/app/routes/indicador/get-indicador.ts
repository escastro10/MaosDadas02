import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function getIndicador(app: FastifyInstance) {

    const params = z.object({
        id: z.string()
    })

    app.get("/indicador/:id", async (req, res) => {

        const { id } = params.parse(req.params)

        const indicador = await prisma.indicador.findUnique({
            where: {
                id
            },
            include: {
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
                },
                OperationItem: {
                    include: {
                        operation: {
                            include: {
                                indicador: true
                            }
                        }
                    }
                }
            }
        })

        return res.status(200).send(indicador)

    })
}