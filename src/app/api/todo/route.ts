// app/api/todo/route.ts

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    //从数据库获取 todo列表
    const todos = await db.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(todos, { status: 200 }); 
  } catch (error) {
    console.log("[GET TODO]", error);

    return new NextResponse("Internal Server Error", { status: 500 }); 
  }
}
