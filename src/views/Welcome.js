import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Button from '../components/Button'



function Welcome() {
  return (
    <div>
      <Routes>

        <Route path="/" element={<Button>Login</Button>} />
      </Routes>
    </div>
  )
}

export default Welcome

