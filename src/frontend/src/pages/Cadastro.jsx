import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"

function Cadastro() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setErro("")
    fetch("http://localhost:8800/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }) // tipo não enviado
    })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          alert("Cadastro realizado com sucesso! Faça login.")
          navigate("/login")
        } else {
          setErro(data || "Erro ao cadastrar")
        }
      })
      .catch(() => setErro("Erro ao conectar ao servidor"))
  }

  return (
    <>
      <Header />
      <main style={{ paddingTop: "110px", minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Cadastro</h2>
          <label>
            Nome:
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label>
            Senha:
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
          </label>
          {erro && <div className="login-erro">{erro}</div>}
          <button className="btn-ctr" type="submit">Cadastrar</button>
        </form>
      </main>
    </>
  )
}

export default Cadastro