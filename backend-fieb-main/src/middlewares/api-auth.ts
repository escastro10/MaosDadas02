import { FastifyReply, FastifyRequest } from "fastify";

interface CustomRequest extends FastifyRequest {
    headers: {
        'x-api-key'?: string;
    }
}

export const authenticate = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const apiKey = (request as CustomRequest).headers['x-api-key']

    if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
        reply.code(401).send({ error: 'Unauthorized!' })
    }
}