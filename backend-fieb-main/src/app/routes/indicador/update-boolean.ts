import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function UpdateBoolean(app: FastifyInstance) {
    const params = z.object({
        indicadorId: z.string()
    })

    const body = z.object({
        value: z.string()
    })

    app.put(`/indicador/update-booleano/:indicadorId`, async (req, res) => {

        const { indicadorId } = params.parse(req.params)
        const { value } = body.parse(req.body)

        const indicador = await prisma.indicador.update({
            where: {
                id: indicadorId
            },
            data: {
                question: value
            }
        })

        return res.send(indicador)

    })
}