# React Inventory Manager

Este projeto é um sistema completo de gerenciamento de inventário de discos de vinil, desenvolvido com React no frontend e Node.js/Express no backend, utilizando MySQL como banco de dados.

## Funcionalidades

- **Catálogo de Discos:** Visualização de todos os discos disponíveis, com detalhes de cada produto.
- **Busca e Paginação:** Pesquisa por discos e navegação paginada no catálogo.
- **Carrinho de Compras (Sacola):** Adicione discos à sacola e finalize a compra (simulação).
- **Cadastro e Login:** Usuários podem se cadastrar e fazer login (cliente ou admin).
- **Área Administrativa:** Usuários admin podem buscar, editar, alterar estoque e remover discos.
- **Destaques:** Carrossel de produtos em destaque na página inicial.

## Como rodar o projeto

### Clonar  Repositório
```sh
git clone https://github.com/camila-vieirao/react-inventory-manager.git
cd .\react-inventory-manager\
```

### 1. Banco de Dados

- Crie um banco de dados MySQL chamado `products`.
- Execute os scripts em `populate_db/insert_products.txt` e `populate_db/insert_users.txt` para popular as tabelas `produtos` e `usuarios`.

### 2. Backend

```sh
cd .\src\backend\ 
npm install
npm run dev
```

O backend estará disponível em http://localhost:8800.

### 3. Frontend

> em outro terminal:

```sh
cd .\src\frontend\
npm install
npm run dev
```

O frontend estará disponível em http://localhost:5173 (ou porta indicada pelo Vite).

## Tecnologias Utilizadas

Frontend: React, Vite, CSS
Backend: Node.js, Express, MySQL, JWT, bcryptjs
Banco de Dados: MySQL


## Observações
O fluxo de compra é apenas simulado (não há integração real de pagamento).
O sistema de autenticação utiliza JWT, mas o token é armazenado no localStorage apenas para fins didáticos.
O projeto é totalmente responsivo e pronto para testes locais.

