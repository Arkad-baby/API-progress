import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req: NextRequest) {  
  
  const id = req.nextUrl.searchParams.get("id");
  if (id) {
    const data = await prisma.document.findUnique({
      where: {
        id
      }, 
    } as any);

    if(data===null){
        return NextResponse.json("Document not found!")
    }
    return NextResponse.json(data);
  }

  const data = await prisma.document.findMany({});
  return NextResponse.json(data);
}


