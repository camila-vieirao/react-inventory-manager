import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Header() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null")
  const navigate = useNavigate()
  const [sacolaCount, setSacolaCount] = useState(0)

  useEffect(() => {
    function updateCount() {
      const sacola = JSON.parse(localStorage.getItem("sacola") || "[]")
      setSacolaCount(sacola.length)
    }
    updateCount()
    window.addEventListener("storage", updateCount)
    // Atualiza ao voltar para a página
    window.addEventListener("focus", updateCount)
    return () => {
      window.removeEventListener("storage", updateCount)
      window.removeEventListener("focus", updateCount)
    }
  }, [])

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    navigate("/login")
  }

  return (
    <header>
      <input type="checkbox" id="toggler" />
      <label htmlFor="toggler" className="fas fa-bars"></label>

      <Link to="/" className="logo">Camila Vieira Discos<span>.</span></Link>

      <nav className="navbar">
        <Link to="/"><i className="fa-solid fa-house"></i> home</Link>
        <Link to="/catalogo"><i className="fa-solid fa-heart"></i> catálogo</Link>
        <Link to="/sacola" className="sacola-link">
          <i className="fa-solid fa-bag-shopping"></i> sacola
        </Link>
        {usuario ? (
          <div className="header-user-dropdown">
            <span className="header-user-nome">{usuario.nome}</span>
            <button className="voluntario-link" onClick={logout}>Sair</button>
          </div>
        ) : (
          <Link to="/login" className="voluntario-link">Login</Link>
        )}
        {usuario && usuario.tipo === "admin" && (
          <Link to="/admin" className="voluntario-link">Gerenciar</Link>
        )}
      </nav>
    </header>
  )
}

export default Header