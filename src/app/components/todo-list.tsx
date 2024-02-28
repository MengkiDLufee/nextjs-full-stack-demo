import { useEffect, useState } from "react";
import { formatDate } from "../lib/format-date";
import TodoItem from "./todo-item";

interface TodoListProps {
  handleEdit: ({ title, id }: { title: string; id: string }) => void;
}

const TodoList = ({ handleEdit }: TodoListProps) => {
  // components/todo-lists
  const [todos, setTodos] = useState([]);

 useEffect(() => {
  //fetch todos
  const fetchTodos = async () => {
    try { 
       const response = await fetch(`/api/todo`, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch items: ${response.status}`
        );
      }

      const data = await response.json();
      setTodos(data);
    } catch (error: any) {
      console.error(`Error fetching items: ${error.message}`);
      // toast.error("unable to fetch todos at this time");
    }
  };
  // call fetch fetchTodos
  fetchTodos();
}, []);


  // const todos = [
  //   {
  //     title: "喝水",
  //     id: "1",
  //     isCompleted: false,
  //     updatedAt: new Date(),
  //   },
  //   {
  //     title: "睡觉",
  //     id: "2",
  //     isCompleted: false,
  //     updatedAt: new Date(),
  //   },
  //   ,
  //   {
  //     title: "散步",
  //     id: "3",
  //     isCompleted: true,
  //     updatedAt: new Date(),
  //   },
  // ];
  return todos.length > 0 ? (
    <ul className="w-full rounded-sm border p-3 space-y-2">
      {todos.map((todo: any) => {
        const updatedDate = formatDate(todo?.updatedAt!);
        return (
          <TodoItem
            key={todo?.id}
            title={todo?.title!}
            isCompleted={todo?.isCompleted!}
            id={todo?.id!}
            updatedAt={updatedDate}
            handleEdit={handleEdit}
          />
        );
      })}
    </ul>
  ) : (
    []
  );
};

export default TodoList;
