import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req: NextRequest) {
  const pageId = req.nextUrl.searchParams.get("pageId");
      const revisionId = req.nextUrl.searchParams.get("id");

    if (pageId) {
      const allRevisionOfaPage = await prisma.revision.findMany({
        where: {
          pageId,
        },
      });
      if (allRevisionOfaPage.length == 0) {
        return NextResponse.json("Revisions not found.");
      }

      return NextResponse.json(allRevisionOfaPage);
    }

   
   else if (revisionId) {
      const aRevisionOfaPage = await prisma.revision.findUnique({
        where: {
          id:revisionId,
        } as any,
      });
      if (aRevisionOfaPage === null) {
        return NextResponse.json("Page not found.");
      }

      return NextResponse.json(aRevisionOfaPage);
    } 
    
    else {
      return NextResponse.json("something went wrong.Please try again");
    }

}
