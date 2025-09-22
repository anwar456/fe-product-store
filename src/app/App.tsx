import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AppRouting from './AppRouting'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="404"
          element={
            <>
              <h3>ERROR 404</h3>
            </>
          }
        />
        <Route path="*" element={<AppRouting />} />
      </Routes>
    </Router>
  )
}
