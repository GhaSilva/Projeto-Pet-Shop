const { json } = require('body-parser')
const { response } = require('express')
const moment = require('moment')

const conexao = require('../infraestrutura/conexao')



class Atendimento{
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.cliente.length >= 4

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'cliente deve ter no mínimo 4 caracteres'
            }
        ]

        const erros =validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length
        if(existemErros){
            res.status(400).json(erros)
        }else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO atendimentos SET ? '
            conexao.query(sql, atendimentoDatado, (erro, resultados) =>{
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(201).json({resultados});
                }
                
            })
        }




    }

    lista(res){
        const sql = 'select * from atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `select * from Atendimentos where id=${id}`
        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'update Atendimentos set ? where id=?'
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    deleta(id, res){
        const sql = 'delete from Atendimentos where id=?'
        conexao.query(sql,id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }
}
module.exports = new Atendimento