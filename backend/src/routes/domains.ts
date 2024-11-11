import {FastifyInstance} from "fastify";
import {prisma} from "../lib/prisma";
import {string, z} from "zod"

export async function domainsRoutes(app: FastifyInstance){
    app.get('/api/domains', async ()=>{
        const domains = await prisma.domain.findMany()
        return domains
    })

    app.get('/api/domains/:id', async (request)=>{
        const paramsSchema = z.object({
            id: z.string().uuid()
        })
        const {id} = paramsSchema.parse(request.params);
        const domain = await prisma.domain.findUniqueOrThrow({
            where:{
                id
            }
        })
        return domain
    })

    app.delete('/api/domains/:id', async (request)=>{
        const paramsSchema = z.object({
            id: z.string().uuid()
        })
        const {id} = paramsSchema.parse(request.params);
        const domain = await prisma.domain.delete({
            where:{
                id
            }
        })
    })

    app.post('/api/domains', async (request)=>{
        const bodySchema = z.object({
            name: z.string()
        })
        const {name} = bodySchema.parse(request.body);
        const domain = await prisma.domain.create({
            data:{
                name
            }
        })

    })
}