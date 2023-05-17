import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req:NextRequest){
const commentId = req.nextUrl.searchParams.get("commentId");
if (commentId) {
  const replyedComment = await prisma.commentReply.findMany({
    where: { commentId },
  });
     if (replyedComment.length == 0) {
       return NextResponse.json("Revisions not found.");
     }
  return NextResponse.json(replyedComment);
}

else 
{
  return NextResponse.json("Internal error occured.");
}
    

}