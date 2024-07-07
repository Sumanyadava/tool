import { createSlice,nanoid } from "@reduxjs/toolkit"; 

const initialStateLong = {
  longTodos: [
    {
      id: 1, // Unique ID for the longTodo
      longname: "Sample Todo",
      longtasks: [
        {
          id: 1, // Unique ID for the task
          plannertitle: "Sample Task",
          deadline: "2024-08-13",
          impurg: ["imp", "urg"],
          milestone: [{ task: "Sample Milestone" }],
          plantext: "Sample plan text",
        },
      ],
    },
  ],
};

const longSlices = createSlice({
  name:"longArray",
  initialState:initialStateLong,
  reducers:{
    addLongTodo: (state, action) => {
      const { id , longname} = action.payload;
      const todo = {
        id: id,
        longname: longname,
        longtasks: [],
      };
      state.longTodos.push(todo);
    },
    removeLongTodo: (state, action) => {
      state.longTodos = state.longTodos.filter((longTodo) => longTodo.id !== action.payload);
    },
    editLongTodo: (state, action) => {
      const { id, longname } = action.payload;
      const existLongTodo = state.longTodos.find((longTodo) => longTodo.id === id);
      if (existLongTodo) {
        existLongTodo.longname = longname;
      }
    },

    addLongTask: (state, action) => {
      const { todoId, taskId, plannertitle, deadline, impurg } = action.payload;
      const longTodo = state.longTodos.find((longTodo) => longTodo.id === todoId);
      if (longTodo) {
        const longTask = {
          id: taskId ,
          plannertitle,
          deadline,
          impurg,
          milestone:[]
          
        };
        longTodo.longtasks.push(longTask);
      }
    },
    
    removeLongTask: (state, action) => {
      const { todoId, taskId } = action.payload;
      const longTodo = state.longTodos.find((longTodo) => longTodo.id === todoId);
      if (longTodo) {
        longTodo.longtasks = longTodo.longtasks.filter((longTask) => longTask.id !== taskId);
      }
    },
    editLongTask: (state, action) => {
      const { todoId, taskId, plannertitle, deadline, impurg, milestone, plantext } = action.payload;
      const longTodo = state.longTodos.find((longTodo) => longTodo.id === todoId);
      if (longTodo) {
        const longTask = longTodo.longtasks.find((longTask) => longTask.id === taskId);
        if (longTask) {
          longTask.plannertitle = plannertitle;
          longTask.deadline = deadline;
          longTask.impurg = impurg;
          longTask.milestone = milestone;
          longTask.plantext = plantext;
        }
      }
    },

    setLongTask: (state, action) => {
      const { todoId, taskId, updatedTask } = action.payload;
      const todo = state.longTodos.find(todo => todo.id === todoId);
      if (todo) {
        const task = todo.longtasks.find(task => task.id === taskId);
        if (task) {
          // Update the task with the properties in updatedTask
          Object.assign(task, updatedTask);
        }
      }
    },


    setLongTodos: (state, action) => {
      state.longTodos = action.payload.map((longTodo) => ({
        id: longTodo._id,
        longname: longTodo.longname,
        longtasks: longTodo.longtasks.map((task) => ({
          id: task._id,
          plannertitle: task.plannertitle,
          deadline: task.deadline,
          impurg: task.impurg,
          milestone: task.milestone,
          plantext: task.plantext,
        })),
      }));
    },


  }

})

export const { addLongTodo,
  removeLongTodo,
  editLongTodo,
  addLongTask,
  removeLongTask,
  editLongTask,
  setLongTask,
  setLongTodos, } = longSlices.actions;
export default longSlices.reducer;