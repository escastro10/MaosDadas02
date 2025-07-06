import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../../../lib/prisma"

export async function getCategoriesByArea(app: FastifyInstance) {
    const params = z.object({
        areaId: z.string()
    })

    app.get("/area/:areaId/categories", async (req, res) => {
        const { areaId } = params.parse(req.params)

        const categories = await prisma.category.findMany({
            where: {
                areaId
            }
        })

        return res.send(categories)
    })
}