const fs = require('fs')
const path = require('path')


module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const tiposValidos = ['jpg', 'png', 'jpeg']
    const tipo = path.extname(caminho)
    const tipoIsValido = tiposValidos.indexOf(tipo.substring(1)) != -1
    if(tipoIsValido){
        const novoCaminho = `./assets/imagens/ ${nomeDoArquivo}${tipo}`
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callbackImagemCriada(false, novoCaminho))
    }else{
         const erro = 'Tipo é iválido' 
         console.log('Erro! Tipo inválido');
         callbackImagemCriada(erro)
    }
       
    
    }

