import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function createTurnoverAcumulado(app: FastifyInstance) {

    const bodySchema = z.object({
        admitidos: z.string(),
        desligados: z.string(),
        efetivoMedio: z.string(),
    })

    const paramsSchema = z.object({
        indicadorId: z.string(),
    })

    app.post(`/indicador/turnover-acumulado/:indicadorId`, async (req, res) => {

        const { indicadorId } = paramsSchema.parse(req.params)
        const { admitidos, desligados, efetivoMedio } = bodySchema.parse(req.body)

        const turnover = await prisma.turnoverAcumulado.create({
            data: {
                admitidos,
                desligados,
                efetivoMedio,
                indicadorId
            }
        })

        return res.status(201).send(turnover)

    })

}