const express = require('express')
const server = express()

server.use(express.json())

var users = []

function verificarUsuarioExistente(request,response,next){
  const {cpf} = request.headers

  const existente = users.some(user=>user.cpf === cpf)

  if(existente){
    return response.status(400).json("Usuario já existente").send()
  }

  return next()
}

server.get('/',(request,response)=>{
  return response.json({msg:`Numero de usuarios cadastrados: ${users.length}`})
})

server.post('/create-user',verificarUsuarioExistente,(request,response)=>{
  const { cpf, cnh, cidadeNasc, estadoNasc, email, telefone, renavam} = request.headers

  users.push({
    cpf,
    cnh,
    cidadeNasc,
    estadoNasc,
    email,
    telefone,
    renavam
  })
  return response.status(201).json("Usuario cadastrado").send()
})


server.listen(3333,()=>{
  console.log('### Servidor ativo')
})