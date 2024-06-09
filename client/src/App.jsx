import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'


function App() {
  const [count, setCount] = useState(0)
  const [sTask, setsTask] = useState(['short task'])
  const [lTask, setlTask] = useState(['long task'])

  return (
    <>
      <Header setsTask={setsTask} sTask={sTask}  lTask={lTask} setlTask={setlTask}/>

      
      <Main sTask={sTask} lTask={lTask} />
    </>
  )
}

export default App
