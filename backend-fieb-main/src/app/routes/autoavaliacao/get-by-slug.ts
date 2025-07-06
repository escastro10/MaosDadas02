import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function getAutoavaliacaoAreaBySlug(app: FastifyInstance) {

    const params = z.object({
        slug: z.string()
    })

    app.get('/autoavaliacoes/areas/:slug', async (req, res) => {

        const { slug } = params.parse(req.params)

        const area = await prisma.autoAvaliacaoArea.findFirst({
            where: {
                slug
            },
            include: {
                Indicador: true
            }
        })

        if (!area) {
            return res.status(404).send({
                message: 'Área não encontrada'
            })
        }

        return res.send(area)
    })

}