import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) => {
  const videoUrl = "https://www.youtube.com/shorts/" + videoId
  console.log("Realizando o download do vídeo", videoId)

  ytdl(videoUrl, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000
      if (seconds > 60) {
        throw new Error("A duração desse vídeo é maior do que 60 segundos ")
      }
    })
    .on("end", () => {
      console.log("Download do vídeo finalizado com sucesso!")
    })

    .on("error", (error) => {
      console.log(
        "Não foi possivel fazer o download do vídeo. Dtealhes do erro: ",
        error
      )
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"))
}
