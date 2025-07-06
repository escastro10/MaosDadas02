import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function getPeriodById(app: FastifyInstance) {
    const params = z.object({
        periodId: z.string()
    })

    app.get("/period/:periodId", async (req, res) => {

        const { periodId } = params.parse(req.params);

        const period = await prisma.period.findUnique({
            where: {
                id: periodId
            }
        });

        return res.send(period);
    })
}