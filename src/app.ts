import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./routes"
import dotenv from "dotenv"

dotenv.config()

const path = require("path")

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000
console.log(PORT)
app.use(cors())
app.use(express.json())

// app.post('/todo/add', (req, res) => {
//   res.json({req: req.body})
// })
app.use(todoRoutes)
app.use(express.static(path.join(__dirname, "client", "build")))

const uri: string = 'mongodb+srv://ogsholzy:jUD9XPitrb7FnDs@cluster0.a1irs.mongodb.net/todo?retryWrites=true&w=majority'
const options: mongoose.ConnectOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)
console.log(uri)
mongoose
  .connect(uri, options)
  .then(() =>{
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  })
  .catch(error => {
    throw error
  })