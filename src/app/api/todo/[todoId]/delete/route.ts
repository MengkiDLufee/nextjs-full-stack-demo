import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { todoId: string } }
){
    try {
        if (!params.todoId) {
            return new NextResponse("Not found", { status: 404 });
        }
        const deleteTodo = await db.todo.delete({
            where: {
                id: params.todoId
            }
        })
        return NextResponse.json(deleteTodo, { status: 200 })
    } catch (error) {
        console.log("[DELETE TODO]", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}