import {FastifyInstance} from "fastify";
import {prisma} from "../lib/prisma";
import {string, z} from "zod"

export async function coursesRoutes(app: FastifyInstance){
    app.get('/api/courses', async () =>{
        const courses = await prisma.domain.findMany()
        return courses
    })

    app.get('/api/courses/:id', async (request)=>{})

}