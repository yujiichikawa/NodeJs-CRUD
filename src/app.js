const express = require('express')
const server = express()

server.use(express.json())

server.get('/',(request,response)=>{
  return response.json({msg:'Home'})
})
server.listen(3333,()=>{
  console.log('### Servidor ativo')
})