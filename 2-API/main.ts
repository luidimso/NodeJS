import * as restify from 'restify'

const server = restify.createServer({
  name: 'teste-api',
  version: '1.0.0'
})

server.get('/teste', (req, resp, next) => {
  resp.json({message: 'Alou'})
  return next()
})

server.listen(3000, ()=>{
  console.log("Tá rodando")
})
