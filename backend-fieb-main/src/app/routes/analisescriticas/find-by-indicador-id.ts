import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../../../lib/prisma"

export async function findAnaliseCriticaByIndicador(app: FastifyInstance) {

    const params = z.object({
        indicadorId: z.string()
    })

    app.get('/analisescriticas/indicador/:indicadorId', async (req, res) => {

        const { indicadorId } = params.parse(req.params)

        const autoavaliacao = await prisma.analiseCritica.findFirst({
            where: {
                indicadorId
            },
            include: {
                indicador: true,
                messages: {
                    include: {
                        user: true
                    }
                }
            }
        })

        return res.status(200).send(autoavaliacao)
    })

}