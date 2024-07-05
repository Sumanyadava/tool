import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialStateShort = {
  todos: [
    {
      id: 1,
      shortname: "hello world text",
      tasks: [
        { id: 1, text: "ui" },
        { id: 2, text: "ux" },
      ],
    },
  ],
};

const shortSlice = createSlice({
  name: "ShortArray",
  initialState: initialStateShort,
  reducers: {
    addTodo: (state, action) => {
      const {id,shortname} = action.payload;
      const todo = {
        id: id,
        shortname: shortname,
        tasks: [],
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, shortname } = action.payload;
      const existTodo = state.todos.find((todo) => todo.id === id);
      if (existTodo) {
        existTodo.shortname = shortname;
      }
    },
    addTask: (state, action) => {
      const { todoId, taskText ,taskId } = action.payload;
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        const task = {
          id: taskId,
          text: taskText,
        };
        todo.tasks.push(task);
      }
    },
    removeTask: (state, action) => {
      const { todoId, taskId } = action.payload;
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        todo.tasks = todo.tasks.filter((task) => task.id !== taskId);
      }
    },
    editTask: (state, action) => {
      const { todoId, taskId, taskText } = action.payload;
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        const task = todo.tasks.find((task) => task.id === taskId);
        if (task) {
          task.text = taskText;
        }
      }
    },
    setTodos: (state, action) => {
      state.todos = action.payload.map((todo) => ({
        id: todo._id, // Use the _id from the backend response as id
        shortname: todo.shortname,
        tasks: todo.tasks.map((task) => ({
          id: task._id, // Use the _id from the backend response as id
          text: task.tname,
        })),
      }));
    },
  },
});

export const {
  addTodo,
  removeTodo,
  editTodo,
  setTodos,
  addTask,
  removeTask,
  editTask,
  setTasks,
} = shortSlice.actions;

export default shortSlice.reducer;
