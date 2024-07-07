import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialStateShort = {
  todos: [
    {
      id: 1,
      shortname: "hello world text",
      tasks: [
        { id: 1, text: "ui", iscompleted: true },
        { id: 2, text: "ux", iscompleted: false },
      ],
    },
  ],
};

const shortSlice = createSlice({
  name: "ShortArray",
  initialState: initialStateShort,
  reducers: {
    addTodo: (state, action) => {
      const { id, shortname } = action.payload;
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
      const { todoId, taskText, taskId } = action.payload;
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        const task = {
          id: taskId,
          text: taskText,
          iscompleted: false,
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
        id: todo._id,
        shortname: todo.shortname,
        tasks: todo.tasks.map((task) => ({
          id: task._id,
          text: task.tname,
          iscompleted: task.iscompleted,
        })),
      }));
    },
    iscompleteTask: (state, action) => {
      const { todoId, taskId } = action.payload;
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        const task = todo.tasks.find((task) => task.id === taskId);
        if (task) {
          task.iscompleted = !task.iscompleted;
        }
      }
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
  iscompleteTask,
} = shortSlice.actions;

export default shortSlice.reducer;
