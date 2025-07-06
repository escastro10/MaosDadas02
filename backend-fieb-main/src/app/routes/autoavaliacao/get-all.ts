import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function getAutoavaliacoesAreas(app: FastifyInstance) {
    app.get('/autoavaliacoes/areas', async (request, reply) => {

        const areas = await prisma.autoAvaliacaoArea.findMany({
            orderBy: {
                name: 'asc'
            }
        })

        return reply.send(areas)

    })
}