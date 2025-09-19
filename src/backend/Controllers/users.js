import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Cadastro
export const register = (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Usuário já existe!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);

    const q = "INSERT INTO usuarios (nome, email, senha_hash, tipo) VALUES (?, ?, ?, ?)";
    db.query(q, [nome, email, hash, tipo || "cliente"], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json({ id: result.insertId, nome, email, tipo: tipo || "cliente" });
    });
  });
};

// Login
export const login = (req, res) => {
  const { email, senha } = req.body;
  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data.length) return res.status(404).json("Usuário não encontrado!");

    const usuario = data[0];
    const isSenhaOk = bcrypt.compareSync(senha, usuario.senha_hash);
    if (!isSenhaOk) return res.status(401).json("Senha incorreta!");

    // Gera token JWT
    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo, nome: usuario.nome, email: usuario.email },
      "seuSegredoJWT", // Troque por uma env var em produção!
      { expiresIn: "2h" }
    );

    // Não envie o hash para o frontend!
    const { senha_hash, ...userData } = usuario;
    res.json({ ...userData, token });
  });
};