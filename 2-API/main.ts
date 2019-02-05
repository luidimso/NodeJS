import {Server} from './server/server'

const server = new Server()
server.bootstrap().then(server=>{
  console.log("Tá ouvindo")
}).catch(error=>{
  console.log("Deu ruim no servidor")
  console.error(error)
  process.exit(1)
})
