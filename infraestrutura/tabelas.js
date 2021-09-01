const { text } = require("body-parser")

class Tabelas{
    init(conexao){
        this.conexao = conexao
        this.criarAtendimento()
        this.criarPets()
    }

    criarAtendimento(){
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'
         

        this.conexao.query(sql, (erro) => {
            if(erro){
                console.log(erro);
            }else{
                console.log("Tabela atendimentos criada com sucesso");
            }
        })
    }

    criarPets(){
        const query = 'create table if not exists Pets (id int not null auto_increment, nome varchar(50), imagem varchar(200), primary key(id))'

        this.conexao.query(query, erro => {
            if(erro){
                console.log(erro);
            }else{
                console.log('Tabela Pet foi criada com sucesso');
            }
        })
    }
}
module.exports = new Tabelas