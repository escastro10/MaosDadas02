import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function getOperationItems(app: FastifyInstance) {

    const params = z.object({
        id: z.string()
    })

    app.get("/indicador/:id/operation-items", async (req, res) => {

        const { id } = params.parse(req.params)

        const items = await prisma.operationItem.findMany({
            where: {
                indicadorId: id
            }
        })

        return res.send(items)
    })

}