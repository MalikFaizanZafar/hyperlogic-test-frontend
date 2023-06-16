import React, { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AddOrUpdateTodoModal from "../modals/AddorUpdateTodoModal";
import LoadingOverlay from "./LoadingOverlay";
import { API_URL } from "../Helpers/utils";

export default function TodoContainer() {
  const [todos, setTodos] = useState([]);
  const [updateTodo, setUpdateTodo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});
  const { isLoading, data } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetch(`${API_URL}/todos`).then((res) => res.json()),
  });

  const schema = yup.object().shape({
    title: yup.string().max(10).required(),
    description: yup.string().max(100).required(),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);

  const [openAddModal, setOpenAddModal] = useState(false);

  const updateTodoMutation = useMutation({
    mutationFn: (todo) => {
      fetch(`${API_URL}/todos/` + todo._id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...todo,
          status: todo?.updated ? todo.status : todo.status === "Completed" ? "incomplete" : "Completed",
        }),
      }).then(async (res) => {
        setSelectedTodo({});
        setUpdateTodo(false);
        toast(todo.updated ? "Todo Updated" : todo.status === "Completed" ? "Todo Pending" : "Todo Completed");
        setOpenAddModal(false);
        setTodos((prevItems) => {
          return prevItems.map((item) => {
            if (item._id === todo._id) {
              return {
                ...todo,
                status: todo?.updated ? item.status : item.status === "Completed" ? "Incomplete" : "Completed",
              };
            }
            return item;
          });
        });
      });
    },
  });

  const newTodoMutation = useMutation({
    mutationFn: (todo) => {
      fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...todo,
          status: "Incomplete",
        }),
      }).then(async (res) => {
        const newTodo = await res.json();
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setOpenAddModal(false);
        toast("Todo Added");
        setValue("title", "");
        setValue("description", "");
        return newTodo;
      });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (id) => {
      fetch(`${API_URL}/todos/` + id, {
        method: "DELETE",
      }).then(async (res) => {
        const currentTodos = todos.filter((tdo) => tdo._id !== id);
        setTodos(currentTodos);
        toast("Todo Deleted");
        return res;
      });
    },
  });

  const onSubmit = (data) => {
    if (updateTodo) {
      let updatedTodo = {
        title: data.title,
        description: data.description,
        status: data.status,
        updated: true,
        _id: selectedTodo._id,
      };
      updateTodoMutation.mutate(updatedTodo);
    } else {
      newTodoMutation.mutate(data);
    }
  };

  const openEditModal = (todo) => {
    setOpenAddModal(true);
    setUpdateTodo(true);
    setSelectedTodo(todo);
    setValue("title", todo.title);
    setValue("description", todo.description);
  };
  return (
    <div className="bg-white border-transparent  border rounded-lg xs:w-full sm:w-full  md:w-1/2  p-3">
      <AddTodo openAddModal={setOpenAddModal} setUpdateTodo={setUpdateTodo} setValue={setValue} />
      <div className=" h-0.5 bg-gray-100 mt-4" />
      <div className=" overflow-y-auto  max-h-todoHeight ">
        {todos.map((item, index) => {
          return (
            <TodoItem
              key={index}
              todo={item}
              index={index}
              deleteTodoMutation={deleteTodoMutation}
              openEditModal={openEditModal}
              handleStatus={updateTodoMutation}
            />
          );
        })}
      </div>
      {openAddModal ? (
        <AddOrUpdateTodoModal
          register={register}
          isLoading={updateTodoMutation.isLoading}
          updateTodo={updateTodo}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          errors={errors}
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
        />
      ) : null}
      {isLoading ? <LoadingOverlay /> : null}
    </div>
  );
}
