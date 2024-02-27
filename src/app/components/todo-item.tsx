import { Check, CheckCircle, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface TodoItemProps {
  title: string;
  id: string;
  isCompleted: boolean;
  updatedAt: string;
  handleEdit: ({ title, id }: { title: string; id: string }) => void;
}

const TodoItem = ({
  title,
  id,
  isCompleted,
  updatedAt,
  handleEdit,
}: TodoItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  // components/todo-item.tsx

  const completeTodo = async () => {
    try {
      const apiUrl = `/api/todo/${id}/update`;

      const requestData = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(apiUrl, requestData);

      if (!response.ok) {
        throw new Error(
          `Failed to post title: ${response.status} - ${response.statusText}`
        );
      }

      console.log("Todo completed");

      // refresh page on successful request
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };


  const editTask = () => {
    handleEdit({ title, id });
  };

  const deleteTask = async () => {
    try {
      const apiUrl = `/api/todo/${id}/delete`;
      const requestData = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(apiUrl, requestData);
      if (!response.ok) {
        throw new Error(
          `Failed to delete item: ${response.status} - ${response.statusText}`
        );
      }
      console.log("Todo deleted");
      alert("Todo deleted");
      window.location.reload();
    } catch (error) {
      console.error(error);
    };
  };

  const todoItemStyle = isCompleted
    ? "w-full rounded-sm border p-2 flex bg-green-100 text-green-600"
    : "w-full rounded-sm border p-2 flex";

  return (
    <li className={todoItemStyle}>
      {title}
      <div className="ml-auto flex space-x-6">
        {isCompleted && (
          <p className="text-slate-600 text-xs italic font-bold">
            completed on {updatedAt}
          </p>
        )}
        {!isCompleted && (
          <button onClick={editTask} className="px-1">
            <Pencil className="text-slate-500" />
          </button>
        )}
        {!isCompleted && (
          <button onClick={completeTodo} className="px-1" type="submit">
            <CheckCircle className="text-green-300" />
          </button>
        )}
        <button onClick={deleteTask} className="px-1" type="submit">
          <Trash2 className="text-red-600" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;

