import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../../../lib/prisma"

export async function createIndiceRemissivo(app: FastifyInstance) {

    const schema = z.object({
        name: z.string(),
        type: z.string(),
    })

    app.post('/indices-remissivos', async (req, res) => {

        const { name, type } = schema.parse(req.body)

        const indiceRemissivo = await prisma.indiceRemissivo.create({
            data: {
                name,
                type
            }
        })

        return res.status(201).send(indiceRemissivo)
    })

}