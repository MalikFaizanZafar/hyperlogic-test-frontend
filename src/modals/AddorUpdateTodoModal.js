import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function AddOrUpdateTodoModal({
  open,
  onClose,
  register,
  errors,
  handleSubmit,
  onSubmit,
  updateTodo = false,
}) {
  return (
    <div>
      <Popup
        modal
        open={open}
        onClose={onClose}
        contentStyle={{
          width: "350px",
          padding: "20px",
          alignItems: "center",
          position: "relative",
          borderRadius: "5px",
        }}
      >
        <h1 className=" font-bold text-lg p-3">{updateTodo ? "Update Todo" : "Add Todo"}</h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input type="text" placeholder="Title" className="input" name="title" {...register("title")} />
              {errors.title && <p className="errorText ">{errors.title.message}</p>}
            </div>
            <div>
              <textarea
                type="text"
                placeholder="Description"
                className="input"
                name="description"
                {...register("description")}
              />
              {errors.description && <p className="errorText">{errors.description.message}</p>}
            </div>
            <button type="submit" className="bg-[#06b6d4] text-white text-center button w-full " onClick={handleSubmit(onSubmit)}>
              <span>{updateTodo ? "Update Todo" : "Add Todo"}</span>
            </button>
          </form>
        </div>
      </Popup>
    </div>
  );
}
