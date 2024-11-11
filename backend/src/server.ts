import fastify from 'fastify'
import cors from "@fastify/cors";

import {usersRoutes} from "./routes/users";
import {rolesRoutes} from "./routes/roles";
import {domainsRoutes} from "./routes/domains";
import {coursesRoutes} from "./routes/courses";
import {classesRoutes} from "./routes/classes";

const app = fastify()

app.register(usersRoutes)
app.register(rolesRoutes)
app.register(domainsRoutes)
app.register(coursesRoutes)
app.register(classesRoutes)

app.register(cors)

app.listen({
    port: 3000
}).then(()=>{
    console.log("HTTP server running on port 3000.")
})
