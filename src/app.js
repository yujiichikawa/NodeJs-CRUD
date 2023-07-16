const express = require('express')
const server = express()

server.use(express.json())

var users = []

function verificarUsuarioExistente(request,response,next){
  const {cpf} = request.headers

  const existente = users.some(user=>user.cpf === cpf)

  if(existente){
    return response.status(400).json("Usuario existente").send()
  }
  
  return next()
}

function buscarUsuario(request,response,next){
  const {cpf} = request.headers

  const us = users.find(user=>user.cpf === cpf)

  if(!us){
    return response.status(400).json("Usuario não existente").send()
  }
  
  request.user = us
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

server.get('/list-users',(request,response)=>{
  if(users.length === 0) return response.status(200).json("Nenhum usuário cadastrado").send()

  return response.status(200).json(users).send()
})

server.put("/update-user",buscarUsuario,(request,response)=>{
  const {email} = request.body
  const {user} = request
  
  user.email = email
  
  return response.status(200).json("E-mail Atualizado").send()
})

server.listen(3333,()=>{
  console.log('### Servidor ativo ###')
})