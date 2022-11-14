import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Quiz from './components/Quiz'
import QuestionContext from './Context/questions/QuestionContext'
import QuestionProvider from './Context/questions/QuestionProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/quiz" element={
        <QuestionProvider>
          <Quiz/>
        </QuestionProvider>
        } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
