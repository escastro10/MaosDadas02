import { FastifyInstance } from "fastify";
import { prisma } from '../../../lib/prisma';

export async function listAllIndicesRemissivos(app: FastifyInstance) {

    app.get('/indices-remissivos', async (req, res) => {

        const indicesRemissivos = await prisma.indiceRemissivo.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return res.status(200).send(indicesRemissivos)
    })

}