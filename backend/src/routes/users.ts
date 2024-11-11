import {FastifyInstance} from "fastify";
import {prisma} from "../lib/prisma";
import {string, z} from "zod"

export async function usersRoutes(app : FastifyInstance){
    app.get('/api/users', async ()=>{
        const users = await prisma.user.findMany()

        return users;
    })

    app.get('/api/users/:id', async (request)=>{
        const paramsSchema = z.object({
            id: z.string().uuid()
        })
        const {id} = paramsSchema.parse(request.params);
        const user = await prisma.user.findUniqueOrThrow({
            where:{
                id
            }
        })
        return user;
    })

    app.delete('/api/users/:id', async (request)=> {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })
        const {id} = paramsSchema.parse(request.params);
        const user = await prisma.user.delete({
            where: {
                id
            }
        })
    })

    app.post('/api/users', async (request)=>{
        const bodySchema = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string()
        })

        const roleSchema = z.object({
            id: z.string().uuid(),
            name: z.string()
        })
        const role = roleSchema.parse(await prisma.role.findUnique({
            where:{
                name:"student"
            }
        }))
        const roleId = role.id

        const {name, email, password} = bodySchema.parse(request.body);
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password,
                roleId
            }
        })
    })

    }