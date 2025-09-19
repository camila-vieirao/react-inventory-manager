import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function CatalogoList() {
  const [discos, setDiscos] = useState([])
  const [paginaAtual, setPaginaAtual] = useState(1)
  const discosPorPagina = 20

  useEffect(() => {
    fetch('http://localhost:8800/products')
      .then(res => res.json())
      .then(data => setDiscos(data))
      .catch(err => console.error(err))
  }, [])

  const inicio = (paginaAtual - 1) * discosPorPagina
  const fim = inicio + discosPorPagina
  const paginaDiscos = discos.slice(inicio, fim)

  return (
    <div>
      <div id="catalogo-lista" className="catalogo-lista">
        {paginaDiscos.map((disco, idx) => (
          <Link key={idx} to={`/disco/${disco.id}`} className="catalogo-item">
            <img src={disco.imageUrl} alt={disco.title} />
            <h3>{disco.title}</h3>
            <p><strong>{disco.artist}</strong></p>
            <p>{disco.genre}</p>
            <p>R$ {Number(disco.price).toFixed(2)}</p>
          </Link>
        ))}
      </div>

      <div className="paginacao">
        <button
          className="paginacao-btn"
          onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))}
          disabled={paginaAtual === 1}
        >
          &lt; Anterior
        </button>

        <span id="pagina-atual">
          Página {paginaAtual} de {Math.ceil(discos.length / discosPorPagina)}
        </span>

        <button
          className="paginacao-btn"
          onClick={() => setPaginaAtual(p => p + 1)}
          disabled={fim >= discos.length}
        >
          Próxima &gt;
        </button>
      </div>
    </div>
  )
}

export default CatalogoList
