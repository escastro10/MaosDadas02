import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function getCategoryCodes(app: FastifyInstance) {

    const params = z.object({
        categoryId: z.string(),
    })

    app.get("/category/:categoryId/codes", async (req, res) => {

        const { categoryId } = params.parse(req.params)

        const category = await prisma.category.findFirst({
            where: {
                id: categoryId
            },
            include: {
                codes: {
                    select: {
                        id: true,
                        code: true,
                    }
                }
            }
        })

        return res.send(category)
    })

}