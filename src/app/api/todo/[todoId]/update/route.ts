// app/api/todo/[todoId]/update/routes.ts

import { db } from "@/lib/db";

import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { todoId: string } }
) {
  try {

    if (!params.todoId) {
      return new NextResponse("Not found", { status: 404 });
    }

    // update todo item whose id matched params.todoId
    const updatedTodo = await db.todo.update({
      where: {
        id: params.todoId,
      },
      data: {
        isCompleted: true,
      },
    });

    // Respond with the updated todo
    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    console.log("[UPDATE TODO]", error);

    // Handle errors
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
