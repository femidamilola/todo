import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
// app.post('/todo/add', (req, res) => {
//   res.json({req: req.body})
// })
app.use(todoRoutes)

const uri: string = `${process.env.MONGO_URI}`
const options: mongoose.ConnectOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)
console.log(uri)
mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })