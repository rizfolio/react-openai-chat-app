import { useState } from 'react'
import './index.css'
import Chat from './components/Chat'

function App() {


  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold">React OpenAI Chat App</h1>


        <Chat />

      </div>
      <footer className="bg-gray-800 text-white text-center p-4 mt-4">
        <p>Powered by OpenAI</p>
      </footer>
    </>
  )
}

export default App
