import { Link, NavLink, Route, Routes, BrowserRouter } from 'react-router-dom'
import './index.css'
import Tasks from './pages/Tasks'
import Layout from './assets/Layout'

function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='/Tasks' element={<Layout><Tasks /></Layout>} />
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
