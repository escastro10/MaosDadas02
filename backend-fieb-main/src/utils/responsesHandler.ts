import { FastifyReply } from "fastify";


export function Response() {

    function success(res: FastifyReply, data: any) {
        return res.status(200).send(data);
    }

    function created(res: FastifyReply, data: any) {
        return res.status(201).send(data);
    }

    function noContent(res: FastifyReply) {
        return res.status(204).send();
    }

    function badRequest(res: FastifyReply, message: string) {
        return res.status(400).send({ message });
    }

    function unauthorized(res: FastifyReply, message: string) {
        return res.status(401).send({ message });
    }

    function forbidden(res: FastifyReply, message: string) {
        return res.status(403).send({ message });
    }

    function notFound(res: FastifyReply, message: string) {
        return res.status(404).send({ message });
    }

    return {
        success,
        created,
        noContent,
        badRequest,
        unauthorized,
        forbidden,
        notFound
    }

}