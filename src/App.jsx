import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import StudentLayout from './components/student/StudentLayout.jsx'
import Dashboard from './pages/student/Dashboard.jsx'
import VehicleRegistration from './pages/student/VehicleRegistration.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register key="student" role="student" />} />
        <Route path="/register/faculty" element={<Register key="faculty" role="faculty" />} />
        <Route path="/status" element={<Home />} />
        <Route element={<StudentLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vehicle-registration" element={<VehicleRegistration />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
