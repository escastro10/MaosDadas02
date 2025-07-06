import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function getTurnoversAcumulados(app: FastifyInstance) {

    const params = z.object({
        categoryId: z.string()
    })

    app.get("/indicador/turnovers-acumulados/:categoryId", async (req, res) => {

        const { categoryId } = params.parse(req.params)

        const turnovers = await prisma.turnoverAcumulado.findMany({
            where: {
                indicador: {
                    categoryId
                }
            }
        })

        return res.status(200).send(turnovers)

    })

}