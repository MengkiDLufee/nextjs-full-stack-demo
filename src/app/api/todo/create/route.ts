// app/api/todo/create/route.ts

import { db } from "@/lib/db";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    // 从请求中解构 todoTitle 
    const { todoTitle } = await req.json(); 

    if (!todoTitle) {
      return new NextResponse("Title required", { status: 400 });
    }

    // 在数据库中新建 todo
    const todo = await db.todo.create({
      data: {
        title: todoTitle,
      },
    });

    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    console.log("[POST TODO]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
