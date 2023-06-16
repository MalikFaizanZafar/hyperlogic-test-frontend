export default function AddTodo({ openAddModal, setValue, setUpdateTodo }) {
  return (
    <div
      onClick={() => {
        openAddModal(true);
        setValue("title", "");
        setUpdateTodo(false);
        setValue("description", "");
      }}
      className=" bg-[#06b6d4] w-36  border rounded-lg p-3 cursor-pointer"
    >
      <h2 className=" text-white">Add New Todo</h2>
    </div>
  );
}
