import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function getPeriods(app: FastifyInstance) {

    app.get('/periods', async (request, reply) => {
        const periods = await prisma.period.findMany({
            orderBy: {
                year: 'desc',
            }
        })

        return reply.send(periods)
    })
}