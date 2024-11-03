import { Hono } from 'hono'
import {userRouter} from "./routes/user"
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors'

const app =new Hono<{
  Bindings:{
    DATABASE_URL:string
    JWT_SCECRT:string
  }
}>()
app.use('/*', cors())
app.route('/api/V1/user',userRouter)
app.route('/api/V1/blog',blogRouter)

export default app