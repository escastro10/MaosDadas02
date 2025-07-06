import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function getTurnoversMedios(app: FastifyInstance) {

    const params = z.object({
        categoryId: z.string()
    })

    app.get('/indicadores/turnovers-medios/:categoryId', async (req, res) => {

        const { categoryId } = params.parse(req.params)

        const turnovers = await prisma.turnoverMedio.findMany({
            where: {
                indicador: {
                    categoryId
                }
            }
        })

        return res.status(200).send(turnovers)

    })

}
