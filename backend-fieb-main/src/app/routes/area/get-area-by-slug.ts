import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function getAreaBySlug(app: FastifyInstance) {

    const params = z.object({
        slug: z.string(),
        period: z.string(),
    })

    app.get("/area/:slug/:period", async (req, res) => {

        const { slug, period } = params.parse(req.params)

        const area = await prisma.area.findFirst({
            where: {
                slug,
                period: {
                    year: Number(period)
                }
            },
            include: {
                period: true,
                categories: {
                    include: {
                        codes: {
                            select: {
                                id: true,
                                code: true,
                            }
                        }
                    }
                },
            }
        })

        return res.send(area)
    })
}