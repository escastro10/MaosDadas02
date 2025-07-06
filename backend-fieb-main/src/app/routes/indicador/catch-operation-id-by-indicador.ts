import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function catchOperationIdByIndicador(app: FastifyInstance) {
    const params = z.object({
        id: z.string()
    })

    app.get("/indicador/:id/operationId", async (req, res) => {

        const { id } = params.parse(req.params)

        const operationId = await prisma.operation.findFirst({
            where: {
                indicadorId: id
            },
            select: {
                id: true
            }
        })

        if (!operationId) {
            res.status(404).send({ message: "Operation not found" })
            return
        }

        res.send(operationId)

    })

}