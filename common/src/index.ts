 import {z} from "zod"

 export const signupinput= z.object({
    username:z.string().min(4),
    email:z.string().email(),
    password:z.string().min(6)
 })
 export const signininput =z.object({
    email:z.string().email(),
    password:z.string().min(6)
 })
export const createblog =z.object({
   title:z.string(),
   content:z.string(),
   id:z.number()
})
 export const updateblog =z.object({
   title:z.string(),
   content:z.string(),
   id:z.number()
})
 

 export type Signupinput =z.infer <typeof signupinput>
 export type Signininput =z.infer< typeof signininput>
 export type CREATEBLOGPOST =z.infer<typeof createblog >
 export type UPDATEBLOGPOST =z.infer<typeof updateblog >
