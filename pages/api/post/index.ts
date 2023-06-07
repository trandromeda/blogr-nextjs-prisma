// pages/api/post/index.ts

import prisma from '../../../lib/prisma';
import { getServerSession } from "next-auth/next"
import { options } from "../auth/[...nextauth]"

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content } = req.body;
 
//   const session = await getSession({ req });
  const session = await getServerSession(req, res, options)

  if (!session) {
    res.statusCode = 403;
    res.json([])
  }
  
  console.log("Session", JSON.stringify(session, null, 2))

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}