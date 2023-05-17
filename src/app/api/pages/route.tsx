import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req: NextRequest) {
  const documentId = req.nextUrl.searchParams.get("documentId");  
  const id = req.nextUrl.searchParams.get("id");
  
  if (documentId) {
    const allPagesOfaDocument = await prisma.pages.findMany({
      where: {
        documentId,
      },
    });
    if (allPagesOfaDocument.length == 0) {
      return NextResponse.json("Pages of your document not found.");
    }

    return NextResponse.json(allPagesOfaDocument);
  }


if (id) {
  const aPagesOfaDocument = await prisma.pages.findUnique({
    where: {
      id,
    },
    include: {
      image: {
        select:{image:true}
      },
    },
  });

  if (aPagesOfaDocument === null) {
    return NextResponse.json({ message: "Page not found." });
  }

  return NextResponse.json(aPagesOfaDocument);
}

}
