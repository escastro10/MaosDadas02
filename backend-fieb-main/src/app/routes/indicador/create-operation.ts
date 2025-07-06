import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function createOperation(app: FastifyInstance) {

    const body = z.object({
        type: z.string(),
    })

    const params = z.object({
        indicadorId: z.string(),
    })

    app.post("/indicador/:indicadorId/operation", async (req, res) => {
        const { indicadorId } = params.parse(req.params)
        const { type } = body.parse(req.body)

        const create = await prisma.operation.create({
            data: {
                type,
                indicadorId
            }
        })

        return res.status(201).send(create)


    })


}