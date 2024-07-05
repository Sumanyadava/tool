import { createSlice,nanoid } from "@reduxjs/toolkit"; 


const initialStateLong = {
  longtodos:[{id:1,longtodo:"hello world"}]
}

const longSlices = createSlice({
  name:"longArray",
  initialState:initialStateLong,
  reducers:{
    addLong: (state, action) => {
      const todo = {
        id: nanoid(),
        longtodo: action.payload,
      };
      state.longtodos.push(todo);
    },
    removeLong: (state, action) => {
      state.longtodos = state.longtodos.filter((todo) => todo.id !== action.payload);
    },
    editLong: (state, action) => {
      const { id, longtodo } = action.payload;
      const existTodo = state.longtodos.find((todo) => todo.id == id);
      console.log("start");
      if (existTodo) {
        console.log("foundit");
        existTodo.longtodo = longtodo;
      } else {
        console.log("cant find");
      }
    },
    
    setlong:(state,action) => {

    }


  }

})

export const { addLong, removeLong, editLong } = longSlices.actions;
export default longSlices.reducer;