const express = require('express')

const app = express()

app.listen(3000, () => console.log('Servidor Rodando na porta 3000'))

app.get('/atendimentos' , (req, res) => res.send('Você está na rota de atendimentos'))