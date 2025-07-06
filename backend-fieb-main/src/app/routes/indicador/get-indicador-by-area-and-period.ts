import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function getIndicadorByAreaAndPeriod(app: FastifyInstance) {

    const params = z.object({
        periodId: z.string(),
    })

    app.get('/areas/indicadores/:periodId', async (req, res) => {

        const { periodId } = params.parse(req.params)

        const areas = await prisma.area.findMany({
            where: {
                periodId
            },
            include: {
                categories: {
                    include: {
                        indicadores: true
                    }
                }
            }
        })

        return res.status(200).send(areas)

    })
}