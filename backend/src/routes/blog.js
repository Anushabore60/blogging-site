import { createblog, updateblog } from "@anusha_bore/medium-common2";
import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
export const blogRouter = new Hono();
blogRouter.use("/*", async (c, next) => {
    const jwt = c.req.header("Authorization");
    if (!jwt) {
        c.status(411);
        c.text("not authorized jwt");
        return;
    }
    console.log(jwt);
    const token = jwt.split(" ")[1];
    const payload = await verify(token, c.env.JWT_SECERT);
    if (payload) {
        c.set("userId", payload.id);
        await next();
    }
    else {
        c.status(411);
    }
    c.json({
        message: "token verification failed"
    });
});
blogRouter.post("/post", async (c) => {
    try {
        const authorid = c.get("userId");
        const body = await c.req.json();
        const successful = createblog.safeParse(body);
        if (!successful) {
            c.status(411);
            c.json({
                message: "error while creating the post "
            });
        }
        const prisma = new PrismaClient({
            datasourceurl: c.env.DATABASE_URL
        }).$extend(withAccelerate());
        await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorid: authorid
            }
        });
        return c.json({ message: "blog post created successfully",
            id: body.id
        });
    }
    catch (err) {
        console.log(err);
    }
});
blogRouter.put('/update', async (c) => {
    try {
        const body = await c.req.json();
        const successful = updateblog.safeParse(body);
        if (!successful) {
            c.status(411);
            c.json({
                message: "updation of the blog post is failed"
            });
        }
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        });
        return c.json({ message: "blog updated succesfully", blog });
    }
    catch (err) {
        c.status(411);
        console.log(err);
    }
});
blogRouter.get('/:id', async (c) => {
    try {
        const id = c.req.param("id");
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());
        const blog = await prisma.post.findFirst({
            where: {
                id: (id)
            },
        });
        return c.json({
            blog
        }, 200);
    }
    catch (err) {
        c.status(411);
        console.log("error while fetching the data");
    }
});
//pagination needs to be added  paginaion means loading the first 10 or first some post in a manner when we  scroll down botton it gets load 
blogRouter.get('/bulk', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());
        const blog = await prisma.post.findMany();
        return c.json({ blog });
    }
    catch (err) {
        c.status(411);
        c.json({ message: "error while finding the blogs" });
    }
});
//creatblogpost , updateblog post failed needs to check and  set ,get failed needs to check in blog router 
//# sourceMappingURL=blog.js.map