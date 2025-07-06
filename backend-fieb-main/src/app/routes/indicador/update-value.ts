import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function updateValue(app: FastifyInstance) {

    const paramsSchema = z.object({
        id: z.string()
    });

    const bodySchema = z.object({
        value: z.number()
    });

    app.put("/indicador/:id", async (req, res) => {
        const { id } = paramsSchema.parse(req.params);
        const { value } = bodySchema.parse(req.body);

        const indicador = await prisma.indicador.update({
            where: {
                id
            },
            data: {
                value
            }
        });

        return res.send(indicador);
    });
}
