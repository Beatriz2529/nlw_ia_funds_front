import cors from "cors"
import express, { request, response } from "express"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"
import { convert } from "./convert.js"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/summary/:id", async (request, response) => {
  try {
    const id = request.params.id
    console.log("id", id)
    await download(id)
    const audiConverted = await convert()

    console.log(audiConverted)

    const result = await transcribe(audiConverted)

    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})

app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text)
    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})

app.listen(3333, () => {
  console.log("Teste 1 2 1 3")
})
