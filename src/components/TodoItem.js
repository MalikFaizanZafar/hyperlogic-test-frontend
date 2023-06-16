import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

export default function TodoItem({ todo, handleStatus, deleteTodoMutation, openEditModal }) {
  return (
    <div className=" flex flex-row items-center justify-center gap-x-3 p-5 hover:bg-[#eaeaea] shadow hover:shadow-lg">
      <label className="checkbox-container">
        <input
          type="checkbox"
          name={todo.title}
          checked={todo.status === "Completed"}
          onChange={(e) => handleStatus.mutate(todo)}
          className="checkbox"
        />
        <span className="checkmark">
          <span className="inner-circle"></span>
        </span>
      </label>
      <h1 className=" text-sm has-tooltip cursor-pointer">
      <span class='tooltip rounded shadow-lg p-1 bg-gray-100 text-dark-500 -mt-8'>{todo.description}</span>
        {todo.title}</h1>
      {todo.status === "Completed" ? (
        <div className="chip">
          <span className="chip-text flex-grow bg-[#00b894]">Completed</span>
        </div>
      ) : null}
      <MdOutlineDelete
        className=" ml-auto cursor-pointer text-lg hover:text-red-500"
        onClick={() => {
          deleteTodoMutation.mutate(todo._id);
        }}
      />
      <MdOutlineEdit
        className="  cursor-pointer text-lg hover:text-sky-500"
        onClick={() => {
          openEditModal(todo);
        }}
      />
    </div>
  );
}
