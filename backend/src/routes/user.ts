import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { signininput,signupinput, } from '@anusha_bore/medium-common';

export  const userRouter = new Hono<{
Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
}
}>()
userRouter.post('/signup',  async (c) => {
    try{
      const body = await c.req.json()
      const successful = signupinput.safeParse(body) 
      if(!successful){
        c.status(411)
        return c.json({
          message:"your input details are incorrect "
        })
      }
    const prisma =new PrismaClient({
       datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    await prisma.$connect()
    console.log('Database connection successful');
    
   const user= await prisma.user.create({
      data:{
       username:body.username,
       email:body.email,
         password: body.password
      },
    })
    const payload= {
      Id:user.id, 
      
    }
    const token = await sign({payload},c.env.JWT_SECRET)
    return c.json({
      jwt:token
    })
  }
  catch(err){
    console.log(err)
    return c.json({ error: 'Internal Server Error' }, 500);
  }})
  userRouter.post('/signin',  async (c) => {
    try{
    const body =await c.req.json()
    const successful = signininput.safeParse(body)
    if(!successful){
      c.status(411)
      c.json({
        message:"your details are incorrect, please check"
      })
    }
   const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
   }).$extends(withAccelerate())
  
   const user = await prisma.user.findUnique({
    where:{
      email:body.email,
      password:body.password
    }
   })
   if(!user){
    c.status(403)
    return c.json({error:"incorrect credentials of the user  "})
   }
   
  const jwt =await sign({
    id:user.id
  },c.env.JWT_SECRET)
  return c.json({
    jwt
  })
    }
    catch(err){
      console.log(err)
      return c.json({message:"failed t sign in the user"})
    }
  })