import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../../../lib/prisma"

export async function getAreas(app: FastifyInstance) {

    const params = z.object({
        periodId: z.string()
    })

    app.get("/areas/:periodId", async (req, res) => {

        const { periodId } = params.parse(req.params)

        const areas = await prisma.area.findMany({
            where: {
                periodId,
            },
            orderBy: {
                name: 'asc'
            },
            include: {
                period: true,
                categories: {
                    include: {
                        indicadores: true
                    }
                }
            }
        })

        return areas

    })

}