import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialStateShortTask = {
  1: [
    { id: nanoid(), text: "task1" },
    { id: nanoid(), text: "task2" },
  ],
};

const shortTaskSlices = createSlice({
  name: "shortTasks",
  initialState: initialStateShortTask,
  reducers: {
    addTask: (state, action) => {
      const { todoId, taskText } = action.payload;

      if (!state[todoId]) {
        state[todoId] = [];
      }
      const task = {
        id: nanoid(),
        text: taskText,
      };
      state[todoId].push(task);
    },
    removeTask: (state, action) => {
      const { todoId, taskId } = action.payload;
      if (state[todoId]) {
        state[todoId] = state[todoId].filter((task) => task.id === taskId);
      }
    },
    editTask: (state, action) => {
      const { todoId, taskId, taskText } = action.payload;
      // Find the task and update the text
      const task = state[todoId]?.find((task) => task.id === taskId);
      if (task) {
        task.text = taskText;
      }
    },
    setTasks:(state,action) => {
      const {todoId,tasks} = action.payload;
      state[todoId] = tasks;
    }
  },
});

export const { addTask, removeTask, editTask } = shortTaskSlices.actions;

export default shortTaskSlices.reducer;
