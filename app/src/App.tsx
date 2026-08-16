import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import DashboardPage from './pages/DashboardPage/DashboardPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}

export default App
