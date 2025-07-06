import fastify from "fastify";

import cors from '@fastify/cors';
import { authenticate } from "../../middlewares/api-auth";
import { allRoutes } from "./routes";


const app = fastify({ logger: true });

app.register(cors, {
    // put your options here
})

// app.addHook("onRequest", authenticate)

app.get("/", async (request, reply) => {
    return {
        message: '🟩 API ON-LINE',
        status: 200
    }
});

// Importando todas as rotas
allRoutes(app)

app.listen({
    host: '0.0.0.0',
    port: 3001
})
    .then(() => {
        console.log('🎉 Servidor Iniciado!')
    })