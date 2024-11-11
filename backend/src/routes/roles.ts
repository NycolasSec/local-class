import {FastifyInstance} from "fastify";
import {prisma} from "../lib/prisma";
import {string, z} from "zod"

export async function rolesRoutes(app: FastifyInstance) {
    app.get('/api/roles', async ()=>{
        const roles = await prisma.role.findMany()
        return roles
    })

    app.get('/api/roles/:id', async (request)=>{
        const paramsSchema = z.object({
            id: z.string().uuid()
        })
        const {id} = paramsSchema.parse(request.params);
        const role = await prisma.user.findUniqueOrThrow({
            where:{
                id
            }
        })

        return role
    })

    app.post('/api/roles', async (request)=>{
        const bodySchema = z.object({
            name: z.string()
        })

        const {name} = bodySchema.parse(request.body)
        const role = await prisma.role.create(
            {
                data:{
                    name
                }
            }
        )
    })
}