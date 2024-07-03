import { createSlice,nanoid } from "@reduxjs/toolkit"; 


const initialStateLong = {
  longtodos:[{id:1,text:"hello world"}]
}

const longSlices = createSlice({
  name:"longArray",
  initialState:initialStateLong,
  reducers:{
    addLong: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.longtodos.push(todo);
    },
    removeLong: (state, action) => {
      state.longtodos = state.longtodos.filter((todo) => todo.id !== action.payload);
    },
    editLong: (state, action) => {
      const { id, text } = action.payload;
      const existTodo = state.longtodos.find((todo) => todo.id == id);
      console.log("start");
      if (existTodo) {
        console.log("foundit");
        existTodo.text = text;
      } else {
        console.log("cant find");
      }
    }


  }

})

export const { addLong, removeLong, editLong } = longSlices.actions;
export default longSlices.reducer;