import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Header from "../components/Header"

function getQueryParams(search) {
  return Object.fromEntries(new URLSearchParams(search))
}

function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const params = getQueryParams(location.search)

  function handleSubmit(e) {
    e.preventDefault()
    setErro("")
    fetch("http://localhost:8800/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem("token", data.token)
          localStorage.setItem("usuario", JSON.stringify(data))
          // Se veio redirect, volta para a página anterior
          if (params.redirect) {
            // Se veio addSacola=1, salva flag para adicionar à sacola ao voltar
            if (params.addSacola === "1") {
              localStorage.setItem("addSacolaDepoisLogin", "1")
            }
            navigate(params.redirect)
          } else {
            navigate("/")
          }
        } else {
          setErro(data || "Erro ao fazer login")
        }
      })
      .catch(() => setErro("Erro ao conectar ao servidor"))
  }

  return (
    <>
      <Header />
      <main style={{ paddingTop: "110px", minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label>
            Email:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label>
            Senha:
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
          </label>
          <div className="login-tipo-info">
            <span>Entre com seu email de cliente ou admin.</span>
            <p style={{textAlign: "center", marginTop: "1rem"}}>
              Não tem conta? <a href="/cadastro" style={{color: "var(--purple)"}}>Cadastre-se</a>
            </p>
          </div>
          {erro && <div className="login-erro">{erro}</div>}
          <button className="btn-ctr" type="submit">Entrar</button>
        </form>
      </main>
    </>
  )
}

export default Login