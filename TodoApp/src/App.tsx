import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import About from './pages/About'
import Overview from './pages/Overview'
import Calendar from './pages/Calendar'
import Tasks from './pages/Tasks'
import Layout from './assets/Layout'

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<Layout />}>
      <Route index element={<Navigate to='/Calendar' replace />} />  
      <Route path='/Tasks' element={<Tasks />} />
      <Route path='/About' element={<About />} />
      <Route path='/Overview' element={<Overview />} />
      <Route path='/Calendar' element={<Calendar />} />
    </Route>
  )
)

function App() {


  return (
    <RouterProvider router={router} />
  )
}

export default App
  