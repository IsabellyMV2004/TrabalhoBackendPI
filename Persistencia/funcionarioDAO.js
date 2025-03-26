import Funcionario from "../Modelo/funcionario.js";
import conectar from "./Conexao.js";

export default class FuncionarioDAO {
    constructor() {
        this.init();
    }

    async init() {
        let conexao;
        try {
            conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS funcionario(
                    codigo INT NOT NULL AUTO_INCREMENT,
                    nome VARCHAR(50) NOT NULL,
                    cpf VARCHAR(14) NOT NULL,
                    cargo VARCHAR(30) NOT NULL,
                    nivel VARCHAR(30) NOT NULL,
                    CONSTRAINT pk_funcionario PRIMARY KEY(codigo)
                );
            `;
            await conexao.execute(sql);
        } catch (erro) {
            console.log("Erro ao iniciar a tabela funcionario!");
        } finally {
            if (conexao) await conexao.release();
        }
    }

    async incluir(funcionario) {
        if (funcionario instanceof Funcionario) {
            const conexao = await conectar();
            const sql = `INSERT INTO funcionario(func_nome,func_cpf, func_cargo, func_nivel)
                values(?,?,?,?)
            `;
            let parametros = [
                funcionario.nome,
                funcionario.cpf,
                funcionario.cargo,
                funcionario.nivel
            ]; //dados do funcionario
            const resultado = await conexao.execute(sql, parametros);
            funcionario.codigo = resultado[0].insertId;
            await conexao.release(); //libera a conexão
        }
    }
    async alterar(funcionario) {
        if (funcionario instanceof Funcionario) {
            const conexao = await conectar();
            const sql = `UPDATE funcionario SET func_nome=?,func_cpf=?,func_cargo=?,func_nivel=?)
                WHERE func_codigo = ?
            `;
            let parametros = [
                funcionario.nome,
                funcionario.cpf,
                funcionario.cargo,
                funcionario.nivel,
                funcionario.codigo
            ]; //dados do funcionario
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }
    async consultar(termo) {
        //resuperar as linhas da tabela funcionario e transformá-las de volta em funcionarios
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM funcionario p
                   WHERE func_nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        }
        else {
            sql = `SELECT * FROM funcionario p
                   WHERE func_codigo = ?`
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaFuncionarios = [];
        for (const linha of linhas) {
            const categoria = new Categoria(linha['codigo'],linha["nome"]);    
            const funcionario = new Funcionario(
                linha['func_codigo'],
                linha['func_nome'],
                linha['func_cpf'],
                linha['func_cargo'],
                linha['func_nivel']
            );
            listaFuncionarios.push(funcionario);
        }
        await conexao.release();
        return listaFuncionarios;
    }
    async excluir(funcionario) {
        if (funcionario instanceof Funcionario) {
            const conexao = await conectar();
            const sql = `DELETE FROM funcionario WHERE func_codigo = ?`;
            let parametros = [
                funcionario.codigo
            ]; //dados do funcionario
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }
}