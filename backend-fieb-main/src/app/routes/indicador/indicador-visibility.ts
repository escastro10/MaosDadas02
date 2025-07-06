import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function indicadorVisibility(app: FastifyInstance) {

    const params = z.object({
        indicadorId: z.string()
    })

    const body = z.object({
        visibility: z.boolean()
    })

    app.put('/indicador/:indicadorId/visibility', async (req, res) => {

        const { indicadorId } = params.parse(req.params)
        const { visibility } = body.parse(req.body)

        const indicador = await prisma.indicador.update({
            where: { id: indicadorId },
            data: {
                isHide: visibility
            }
        })

        res.send(indicador)
    })

}