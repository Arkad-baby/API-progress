import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req:NextRequest){
    const documentId = req.nextUrl.searchParams.get("documentId");
    const pageId = req.nextUrl.searchParams.get("pageId");
    const revisionId = req.nextUrl.searchParams.get("revisionId");
    if(documentId){
        const commentsInaDocument=await prisma.comment.findMany({
            where:{documentId}
        })
          if (commentsInaDocument.length == 0) {
            return NextResponse.json("Comment not found.");
          }
        

        return NextResponse.json(commentsInaDocument);
    }
    else if (pageId) {
      const commentsInaPage = await prisma.comment.findMany({
        where: { pageId },
      });
         if (commentsInaPage.length == 0) {
           return NextResponse.json("Comment not found.");
         }

      return NextResponse.json(commentsInaPage);
    } else if (revisionId) {
      const commentsInaRevision = await prisma.comment.findMany({
        where: { revisionId },
      });
         if (commentsInaRevision.length == 0) {
           return NextResponse.json("Comment not found.");
         }

      return NextResponse.json(commentsInaRevision);

    }


    else{
        return NextResponse.json("Internal error occured.")
    }

}