import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function getAreasByPeriodYear(app: FastifyInstance) {

    const schema = z.object({
        year: z.number()
    })

    app.get('/areas/year/:year', async (req, res) => {

        const { year } = schema.parse(req.params)

        const getYear = await prisma.area.findMany({
            where: {
                period: {
                    year
                }
            }
        })

        return res.status(200).send(getYear)

    })

}