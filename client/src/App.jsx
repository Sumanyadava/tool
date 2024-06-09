import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'


function App() {
  const [count, setCount] = useState(0)
  const [itemApp, setItemApp] = useState(['short task'])
  const [secItem, setSecItem] = useState(['long task'])

  return (
    <>
      <Header item="item" setItemApp={setItemApp} itemApp={itemApp}  secItem={secItem} setSecItem={setSecItem}/>

      
      <Main itemApp={itemApp} secItem={secItem} />
    </>
  )
}

export default App
