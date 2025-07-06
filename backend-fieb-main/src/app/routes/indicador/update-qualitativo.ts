import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function updateQualitativo(app: FastifyInstance) {

    const params = z.object({
        indicadorId: z.string()
    })

    const body = z.object({
        qualitativo: z.string()
    })

    app.put(`/indicador/update-qualitativo/:indicadorId`, async (req, res) => {

        const { indicadorId } = params.parse(req.params)
        const { qualitativo } = body.parse(req.body)

        const indicador = await prisma.indicador.update({
            where: {
                id: indicadorId
            },
            data: {
                qualitativo
            }
        })

        return res.status(200).send(indicador)

    })

}
