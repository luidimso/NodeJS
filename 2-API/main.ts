import {Server} from './server/server'
import {usersRouter} from './users/users.router'

const server = new Server()
server.bootstrap([usersRouter]).then(server=>{
  console.log("Tá ouvindo")
}).catch(error=>{
  console.log("Deu ruim no servidor")
  console.error(error)
  process.exit(1)
})
