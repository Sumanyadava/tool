import { createSlice,nanoid } from "@reduxjs/toolkit"; 


const initialStateShort = {
  todos:[{id:1,text:"hello world"}]
}
const shortSlice = createSlice({
  name:"ShortArray",
  initialState:initialStateShort,
  reducers:{
    addTodo: (state,action) =>{
      const todo = {
        id:nanoid(),
        text:action.payload,
        
      }
      state.todos.push(todo)
    },
    removeTodo:(state,action) => {
      state.todos = state.todos.filter((todo) => todo.id !==action.payload)
    },
    editTodo:(state,action) => {
      const { id, text } = action.payload;
      const existTodo = state.todos.find((todo) => todo.id == id);
      console.log("start")
      if (existTodo) {
        console.log("foundit")
        existTodo.text = text;
        
      }else{
        console.log("cant find")
        
      }
    }
  }
});


export const {addTodo,removeTodo,editTodo} = shortSlice.actions

export default shortSlice.reducer
