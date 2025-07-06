import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function deleteIndicador(app: FastifyInstance) {
    const schema = z.object({
        id: z.string(),
    });

    app.delete("/indicador", async (req, res) => {
        try {
            const { id } = schema.parse(req.body);

            const indicador = await prisma.indicador.findUnique({
                where: { id }
            });

            if (!indicador) {
                return res.status(404).send({ message: "Indicador not found" });
            }

            // Excluir dependências primeiro
            await prisma.analiseCritica.deleteMany({
                where: { indicadorId: id }
            });

            // Agora pode deletar o indicador
            await prisma.indicador.delete({
                where: { id }
            });

            return res.send({ message: "Indicador deleted" });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Internal server error" });
        }
    });
}
