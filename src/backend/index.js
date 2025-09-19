import express from "express"
import productRoutes from "./Routes/products.js"
import userRoutes from "./Routes/users.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/products", productRoutes)
app.use("/users", userRoutes)

app.listen(8800)