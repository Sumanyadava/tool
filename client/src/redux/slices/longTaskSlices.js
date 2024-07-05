import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialStateLongTask = {
  [1]: [
    {
      id:21,
      title: "tiads",
      deadline: "2024-07-13",
      tag: "tags",
    },
    {
      id:22,
      title: "tiadssdf",
      deadline: "2024-08-13",
      tag: "tags",
    },
  ],
};


const longTaskSlices = createSlice({
  name: "longTasks",
  initialState: initialStateLongTask,
  reducers: {
    addLongTask: (state, action) => {
      const { todoId, taskTitle, taskDeadline, taskTag } = action.payload;

      if (!state[todoId]) {
        state[todoId] = [];
      }
      const task = {
        id: nanoid(),
        title: taskTitle,
        deadline: taskDeadline,
        tag: taskTag,
      };
      state[todoId].push(task);
    },
    removeLongTask: (state, action) => {
      const { todoId, taskId } = action.payload;
      if (state[todoId]) {
        state[todoId] = state[todoId].filter((task) => task.id !== taskId); // Fixed condition
      }
    },
    editLongTask: (state, action) => {
      const { todoId, taskId, taskTitle, taskDeadline, taskTag } = action.payload;
      // Find the task and update the details
      const task = state[todoId]?.find((task) => task.id === taskId);
      if (task) {
        task.title = taskTitle;
        task.deadline = taskDeadline;
        task.tag = taskTag;
      }
    },
  },
});

export const { addLongTask, removeLongTask, editLongTask } = longTaskSlices.actions;

export default longTaskSlices.reducer;