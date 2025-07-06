import { FastifyInstance } from "fastify";

import { createClerkClient } from '@clerk/clerk-sdk-node';

import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export const clerk = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
})

export async function createUser(app: FastifyInstance) {

    const userSchema = z.object({
        firstName: z.string(),
        lastName: z.string(),
        isAdmin: z.boolean().optional(),
        email: z.string().email(),
        photo: z.string().optional(),
        password: z.string()
    })

    app.post('/user', async (req, res) => {

        const { firstName, lastName, isAdmin, email, photo, password } = userSchema.parse(req.body);

        // Se já existir um usuário com o email informado, retornar erro
        const userExists = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (userExists) {
            return res.status(400).send({ error: 'User already exists' });
        }

        const clerkUser = await clerk.users.createUser({
            firstName,
            lastName,
            emailAddress: [email],
            password: password,
        })

        if (clerkUser.id) {
            const user = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    isAdmin,
                    email,
                    photo
                }
            })
            return res.status(201).send(user);
        } else {
            return res.status(500).send({ error: 'Error creating user' });
        }

    })

}