import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function createArea(app: FastifyInstance) {
    const schema = z.object({
        name: z.string(),
        slug: z.string(),
        periodId: z.string(),
        iconName: z.string()
    })

    app.post("/area", async (req, res) => {
        const { name, slug, iconName, periodId } = schema.parse(req.body)

        const area = await prisma.area.create({
            data: {
                name,
                slug,
                periodId,
                iconName
            }
        })

        return res.status(201).send(area)
    })
}