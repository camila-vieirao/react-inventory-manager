import { db } from "../db.js";

export const getProducts = (_, res) => {
  const q = "SELECT * FROM produtos";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addProduct = (req, res) => {
  const { title, artist, genre, lp_condition, price, quantity, description, imageUrl, createdAt, updatedAt } = req.body;
  // NÃO envie o id se for AUTO_INCREMENT!
  const q = "INSERT INTO produtos (title, artist, genre, lp_condition, price, quantity, description, imageUrl, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(q, [title, artist, genre, lp_condition, price, quantity, description, imageUrl, createdAt, updatedAt], (err, result) => {
    if (err) return res.json(err);
    return res.status(201).json({ id: result.insertId, ...req.body });
  });
};

export const deleteProduct = (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM produtos WHERE id = ?";
  db.query(q, [id], (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json({ success: true });
  });
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { title, artist, genre, lp_condition, price, quantity, description, imageUrl, createdAt, updatedAt } = req.body;
  const q = "UPDATE produtos SET title=?, artist=?, genre=?, lp_condition=?, price=?, quantity=?, description=?, imageUrl=?, createdAt=?, updatedAt=? WHERE id=?";
  db.query(q, [title, artist, genre, lp_condition, price, quantity, description, imageUrl, createdAt, updatedAt, id], (err, result) => {
    if (err){
      console.log(err);
      return res.json(err);
    } 
    return res.status(200).json({ success: true });
  });
};

export const searchProduct = (req, res) => {
  const { name } = req.query;
  const q = "SELECT * FROM produtos WHERE title LIKE ?";
  db.query(q, [`%${name}%`], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};