import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import DiscoDetalhe from './pages/DiscoDetalhe'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Sacola from './pages/Sacola'
import Admin from './pages/Admin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/disco/:id" element={<DiscoDetalhe />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/sacola" element={<Sacola />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App