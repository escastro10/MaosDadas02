import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function getAreaById(app: FastifyInstance) {

    const params = z.object({
        areaId: z.string(),
    })

    app.get('/area/:areaId', async (req, res) => {

        const { areaId } = params.parse(req.params);

        const area = await prisma.area.findFirst({
            where: {
                id: areaId
            },
            include: {
                period: true,
                categories: true
            }
        })

        return res.send(area);
    })

}