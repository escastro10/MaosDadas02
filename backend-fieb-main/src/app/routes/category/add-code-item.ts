import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function addCodeItem(app: FastifyInstance) {

    const params = z.object({
        categoryId: z.string(),
    })

    const body = z.object({
        codeId: z.string(),
    })

    app.post("/category/:categoryId/code", async (req, res) => {

        const { categoryId } = params.parse(req.params)
        const { codeId } = body.parse(req.body)


        const add = await prisma.codeItem.create({
            data: {
                codeId,
                categoryId
            }
        })
        return res.send(add)

    })

}