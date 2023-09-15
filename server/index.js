import cors from "cors"
import express from "express"
import { download } from "./download.js"

const app = express()
app.use(cors())

app.get("/summary/:id", (request, response) => {
  const id = request.params.id
  download(id)
  response.json({ result: "Download do vídeo realizado com sucesso!" })
})

app.listen(3333, () => {
  console.log("Teste 1 2 1 3")
})
