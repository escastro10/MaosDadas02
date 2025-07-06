import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function changePeriodStatus(app: FastifyInstance) {

    const params = z.object({
        id: z.string(),
    })

    const body = z.object({
        status: z.boolean(),
    })

    app.put('/periods/:id/status', async (request, res) => {
        const { id } = params.parse(request.params)
        const { status } = body.parse(request.body)

        const period = await prisma.period.update({
            where: {
                id,
            },
            data: {
                open: status,
            }
        })

        return res.send(period)
    })

}