import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../../../lib/prisma"

export async function addOperationItem(app: FastifyInstance) {
    const body = z.object({
        operationId: z.string(),
        indicadorId: z.string(),
    })

    app.post("/operation-item", async (req, res) => {
        const { operationId, indicadorId } = body.parse(req.body)

        const create = await prisma.operationItem.create({
            data: {
                operationId,
                indicadorId,
            }, 
        })

        return res.status(201).send(create)
    })
}
