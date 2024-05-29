import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import requestService from './services/requestservice.jsx'

const App = () => {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('tyhjä viesti')

  useEffect(() => {
    const functionToLoad = async () => {
      try {
        const result = await requestService.getRequestToFlask()
        setMessage(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    functionToLoad() 
  }, [])


  console.log(message)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <p>{message.content}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
