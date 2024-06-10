import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'

import { useSelector, useDispatch } from "react-redux";
import { IncAction, DecAction, TodoAdd , RemoveTodo } from "./action/index";


function App() {
  const myState = useSelector((state) => state.changeTheNumber);
  const arraytodo = useSelector((state) => state.todoChanger)
  const dispatch = useDispatch();

  const [count, setCount] = useState(0)
  const [sTask, setsTask] = useState(['short task'])
  const [lTask, setlTask] = useState(['long task'])

  return (
    <>
      <Header setsTask={setsTask} sTask={sTask}  lTask={lTask} setlTask={setlTask}/>

      
      <Main sTask={sTask} lTask={lTask} />


      <button onClick={() => dispatch(IncAction(5))}>+</button>
      <input type="text" name="" id="" value={myState} />
      {arraytodo}
      <button onClick={() => dispatch(TodoAdd())}>-</button>
    </>
  )
}

export default App
