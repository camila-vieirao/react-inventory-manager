import { useEffect, useState } from "react"
import Header from "../components/Header"

function Sacola() {
  const [sacola, setSacola] = useState([])

  useEffect(() => {
    const itens = JSON.parse(localStorage.getItem("sacola") || "[]")
    setSacola(itens)
  }, [])

  function remover(index) {
    const novaSacola = [...sacola]
    novaSacola.splice(index, 1)
    setSacola(novaSacola)
    localStorage.setItem("sacola", JSON.stringify(novaSacola))
  }

  function finalizarCompra() {
    alert("Compra finalizada! (apenas enfeite)")
  }

  return (
    <>
      <Header />
      <main style={{ paddingTop: "110px", minHeight: "80vh", maxWidth: 700, margin: "0 auto" }}>
        <h1 className="heading"><span>Sacola</span></h1>
        {sacola.length === 0 ? (
          <p style={{textAlign: "center", fontSize: "1.5rem"}}>Sua sacola está vazia.</p>
        ) : (
          <div className="sacola-lista">
            {sacola.map((item, idx) => (
              <div className="sacola-item" key={idx}>
                <img src={item.imageUrl} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.artist}</p>
                  <p>R$ {Number(item.price).toFixed(2)}</p>
                </div>
                <button className="btn-ctr" style={{background:"#ccc", color:"#333"}} onClick={() => remover(idx)}>Remover</button>
              </div>
            ))}
            <div className="valor-total-sacola">
              <h3>Valor Total:</h3>
              <p>R$ {sacola.reduce((total, item) => total + Number(item.price), 0).toFixed(2)}</p>
            </div>
            <div style={{textAlign: "right", marginTop: "2rem"}}>
              <button className="btn-ctr" onClick={finalizarCompra}>Finalizar compra</button>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default Sacola