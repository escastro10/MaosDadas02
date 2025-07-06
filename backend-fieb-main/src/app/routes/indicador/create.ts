import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { Response } from "../../../utils/responsesHandler";

export async function createIndicador(app: FastifyInstance) {

    const response = Response()

    const schema = z.object({
        pergunta: z.string(),
        type: z.string(),
        isPriority: z.boolean().optional(),
        categoryId: z.string(),
        hasUpload: z.boolean().optional(),
        autoAvaliacaoAreaId: z.string().optional(),
        draft: z.boolean().optional(),
        qualitativo: z.string().optional(),
        question: z.string().optional(),

    })

    app.post('/indicador', async (req, res) => {

        const { pergunta, type, isPriority, hasUpload, categoryId, draft, autoAvaliacaoAreaId, qualitativo, question } = schema.parse(req.body)

        const existingIndicador = await prisma.indicador.findFirst({
            where: {
                pergunta,
                categoryId
            }
        });

        if (existingIndicador) {
            return res.status(400).send({ error: 'Este indicador já existe nesta categoria.' })
        }

        const create = await prisma.indicador.create({
            data: {
                pergunta,
                type,
                isPriority,
                categoryId,
                hasUpload,
                autoAvaliacaoAreaId,
                draft,
                qualitativo,
                question
            },
            select: {
                id: true,
                pergunta: true,
                type: true,
                isPriority: true,
                hasUpload: true,
                autoAvaliacaoAreaId: true,
                draft: true,
                createdAt: true,
                turnoverAcumulado: true,
                turnoverMedio: true,
                analises_criticas: true,
                categoryId: true,
                isHide: true,
                qualitativo: true,
                question: true,
            }
        })

        await prisma.analiseCritica.create({
            data: {
                indicadorId: create.id
            }
        })

        return res.status(201).send(create)
    })

}