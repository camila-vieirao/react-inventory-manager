import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Header from "../components/Header"

function truncateWords(text, maxWords) {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

function DiscoDetalhe() {
  const { id } = useParams()
  const [disco, setDisco] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAviso, setShowAviso] = useState(false)
  const [showSacolaAviso, setShowSacolaAviso] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:8800/products`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(d => String(d.id) === String(id))
        setDisco(found)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return <div>Carregando...</div>
  if (!disco) return <div>Disco não encontrado.</div>

  function adicionarNaSacola() {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null")
    if (!usuario) {
      // Salva para redirecionar de volta depois do login
      navigate(`/login?redirect=/disco/${id}&addSacola=1`)
      return
    }
    // Aqui você pode implementar a lógica de adicionar à sacola (localStorage, contexto, etc)
    // Exemplo simples:
    let sacola = JSON.parse(localStorage.getItem("sacola") || "[]")
    sacola.push(disco)
    localStorage.setItem("sacola", JSON.stringify(sacola))
    setShowSacolaAviso(true)
  }

  function handleContinuarComprando() {
    setShowSacolaAviso(false)
  }

  function handleIrParaSacola() {
    navigate("/sacola")
  }

  function handleContinuarLogin() {
    navigate(`/login?redirect=/disco/${id}&addSacola=1`)
  }

  function handleCancelarAviso() {
    setShowAviso(false)
  }

  return (
    <>
      <Header />
      <main style={{ paddingTop: '110px', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', position: 'relative' }}>
        <div className="disco-detalhe-container">
          <img src={disco.imageUrl} alt={disco.title} className="disco-detalhe-img" />
          <div className="disco-detalhe-info">
            <h2>{disco.title}</h2>
            <p><strong>Artista:</strong> {disco.artist}</p>
            <p><strong>Gênero:</strong> {disco.genre}</p>
            <p><strong>Descrição:</strong> {truncateWords(disco.description, 100)}</p>
            <p><strong>Preço:</strong> <span style={{ color: "var(--purple)", fontWeight: "bold" }}>R$ {Number(disco.price).toFixed(2)}</span></p>
            <button className="btn-ctr" onClick={adicionarNaSacola}>Adicionar à sacola</button>
          </div>
        </div>
        {/* Aviso para continuar comprando ou ir para sacola */}
        {showSacolaAviso && (
          <div className="aviso-login-overlay">
            <div className="aviso-login-box">
              <p>Disco adicionado à sacola!</p>
              <div className="aviso-login-btns">
                <button className="btn-ctr" style={{background:"#ccc", color:"#333"}} onClick={handleContinuarComprando}>Continuar comprando</button>
                <button className="btn-ctr" onClick={handleIrParaSacola}>Ir para sacola</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default DiscoDetalhe