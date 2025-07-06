import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function getCategoryById(app: FastifyInstance) {

    const params = z.object({
        id: z.string()
    })

    app.get("/category/:id", async (req, res) => {

        const { id } = params.parse(req.params)

        const category = await prisma.category.findUnique({
            where: {
                id
            },
            include: {
                codes: {
                    include: {
                        code: true
                    }
                }
            }
        })

        return res.send(category)

    })

}