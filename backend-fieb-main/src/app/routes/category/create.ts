import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function createCategory(app: FastifyInstance) {

    const params = z.object({
        areaId: z.string(),
    })

    const body = z.object({
        name: z.string(),
    })

    app.post("/category/:areaId", async (req, res) => {

        const { areaId } = params.parse(req.params)
        const { name } = body.parse(req.body)

        // Create category
        const category = await prisma.category.create({
            data: {
                name,
                areaId
            }
        })

        return res.send(category)

    })

}