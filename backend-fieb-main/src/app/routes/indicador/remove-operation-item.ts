import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function removeOperationItem(app: FastifyInstance) {

    const params = z.object({
        id: z.string()
    })

    app.delete("/operation-item/:id", async (req, res) => {

        const { id } = params.parse(req.params)

        await prisma.operationItem.delete({
            where: {
                id
            }
        })

        return res.status(204).send()
    })
}