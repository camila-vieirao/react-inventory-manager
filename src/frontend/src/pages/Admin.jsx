import { useState } from "react"
import Header from "../components/Header"

function Admin() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null")
  const [idBusca, setIdBusca] = useState("")
  const [disco, setDisco] = useState(null)
  const [erro, setErro] = useState("")
  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState({})
  const [sucesso, setSucesso] = useState("")
  const [editandoEstoque, setEditandoEstoque] = useState(false)
  const [novoEstoque, setNovoEstoque] = useState("")
  const [confirmandoRemover, setConfirmandoRemover] = useState(false)

  if (!usuario || usuario.tipo !== "admin") {
    return (
      <>
        <Header />
        <main style={{ paddingTop: "110px", textAlign: "center" }}>
          <h2>Você não tem permissão para acessar esta página.</h2>
        </main>
      </>
    )
  }

  
  function formatDateForMySQL(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    if (isNaN(d)) return null;
    // Ajuste para fuso horário local se necessário
    const pad = n => n < 10 ? '0' + n : n;
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }
  

  function buscarDisco(e) {
    e.preventDefault()
    setErro("")
    setSucesso("")
    fetch(`http://localhost:8800/products`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(d => String(d.id) === String(idBusca))
        if (!found) {
          setErro("Disco não encontrado.")
          setDisco(null)
        } else {
          setDisco(found)
          setForm({
            title: found.title || "",
            artist: found.artist || "",
            genre: found.genre || "",
            lp_condition: found.lp_condition || "",
            price: found.price || "",
            quantity: found.quantity || "",
            description: found.description || "",
            imageUrl: found.imageUrl || "",
            createdAt: found.createdAt || "",
            updatedAt: found.updatedAt || ""
          })
        }
      })
      .catch(() => setErro("Erro ao buscar disco"))
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function salvarEdicao(e) {
    e.preventDefault()
    setErro("")
    setSucesso("")
    const payload = {
      title: form.title,
      artist: form.artist,
      genre: form.genre,
      lp_condition: form.lp_condition || "",
      price: form.price,
      quantity: form.quantity,
      description: form.description,
      imageUrl: form.imageUrl,
      createdAt: formatDateForMySQL(form.createdAt) || formatDateForMySQL(new Date()),
      updatedAt: formatDateForMySQL(new Date())
    }
    fetch(`http://localhost:8800/products/${disco.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSucesso("Disco atualizado com sucesso!")
          setDisco({ ...disco, ...payload })
          setEditando(false)
        } else {
          setErro("Erro ao atualizar disco")
        }
      })
      .catch(() => setErro("Erro ao atualizar disco"))
  }

  function salvarEstoque(e) {
    e.preventDefault()
    setErro("")
    setSucesso("")
    fetch(`http://localhost:8800/products/${disco.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...disco, quantity: novoEstoque })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSucesso("Estoque atualizado!")
          setDisco({ ...disco, quantity: novoEstoque })
          setEditandoEstoque(false)
        } else {
          setErro("Erro ao atualizar estoque")
        }
      })
      .catch(() => setErro("Erro ao atualizar estoque"))
  }

  function removerDisco() {
    setErro("")
    setSucesso("")
    fetch(`http://localhost:8800/products/${disco.id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSucesso("Disco removido com sucesso!")
          setDisco(null)
        } else {
          setErro("Erro ao remover disco")
        }
      })
      .catch(() => setErro("Erro ao remover disco"))
  }

  return (
    <>
      <Header />
      <main style={{ paddingTop: "110px", maxWidth: 700, margin: "0 auto" }}>
        <h1 className="heading"><span>Gerenciamento de Discos</span></h1>
        <form onSubmit={buscarDisco} style={{ marginBottom: "2rem", textAlign: "center" }}>
          <input
            type="text"
            placeholder="ID do disco"
            value={idBusca}
            onChange={e => setIdBusca(e.target.value)}
            style={{ padding: "0.7rem 1rem", fontSize: "1.2rem", borderRadius: "0.5rem", border: "1px solid #ccc" }}
          />
          <button className="btn-ctr" type="submit" style={{ marginLeft: "1rem" }}>Buscar</button>
        </form>
        {erro && <div className="login-erro">{erro}</div>}
        {sucesso && <div className="login-sucesso">{sucesso}</div>}
        {disco && (
          <div className="admin-disco-box">
            <img src={disco.imageUrl} alt={disco.title} style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8, marginBottom: 10 }} />
            {!editando ? (
              <>
                <h3>{disco.title}</h3>
                <p><strong>Artista:</strong> {disco.artist}</p>
                <p><strong>Gênero:</strong> {disco.genre}</p>
                <p><strong>Estoque:</strong> {disco.quantity}</p>
                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                  <button className="btn-ctr" onClick={() => setEditando(true)}>Editar dados</button>
                  {!editandoEstoque ? (
                    <button className="btn-ctr" style={{ background: "#f3d9fb", color: "#640180" }} onClick={() => {
                      setEditandoEstoque(true)
                      setNovoEstoque(disco.quantity)
                    }}>Alterar estoque</button>
                  ) : (
                    <form onSubmit={salvarEstoque} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <input
                        type="number"
                        name="novoEstoque"
                        value={novoEstoque}
                        onChange={e => setNovoEstoque(e.target.value)}
                        style={{ width: 80, padding: "0.5rem", borderRadius: "0.4rem", border: "1px solid #ccc" }}
                        min="0"
                        required
                      />
                      <button className="btn-ctr" type="submit" style={{ minWidth: 80 }}>Salvar</button>
                      <button className="btn-ctr" type="button" style={{ background: "#ccc", color: "#333", minWidth: 80 }} onClick={() => setEditandoEstoque(false)}>Cancelar</button>
                    </form>
                  )}
                  {!confirmandoRemover ? (
                    <button className="btn-ctr" style={{ background: "#e12f2f", color: "#fff" }} onClick={() => setConfirmandoRemover(true)}>Remover disco</button>
                  ) : (
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span>Confirmar?</span>
                      <button className="btn-ctr" style={{ background: "#e12f2f", color: "#fff" }} onClick={removerDisco}>Sim</button>
                      <button className="btn-ctr" style={{ background: "#ccc", color: "#333" }} onClick={() => setConfirmandoRemover(false)}>Cancelar</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <form onSubmit={salvarEdicao} style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.7rem", width: "100%" }}>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Título" required />
                <input name="artist" value={form.artist} onChange={handleChange} placeholder="Artista" required />
                <input name="genre" value={form.genre} onChange={handleChange} placeholder="Gênero" required />
                <input name="lp_condition" value={form.lp_condition} onChange={handleChange} placeholder="Condição" required />
                <input name="price" value={form.price} onChange={handleChange} placeholder="Preço" required />
                <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Estoque" required />
                <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="URL da imagem" required />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descrição" rows={3} />
                <div className="admin-btn-row">
                  <button className="btn-ctr" type="submit">Salvar</button>
                  <button className="btn-ctr" type="button" style={{ background: "#ccc", color: "#333" }} onClick={() => setEditando(false)}>Cancelar</button>
                </div>
              </form>
            )}
          </div>
        )}
      </main>
    </>
  )
}

export default Admin