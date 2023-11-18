const express = require('express');
const app = express();
const port = 3001; //porta disponível
const pool = require('./db/pool');

// Middleware para tratar dados codificados na URL e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota para adicionar um novo currículo
app.post('/add', (req, res) => {
    const { nome, email, telefone, formacao, profissao, experiencia } = req.body;
    const sql = 'INSERT INTO curriculos (nome, email, telefone, formacao, profissao, experiencia) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [nome, email, telefone, formacao, profissao, experiencia];

    pool.query(sql, values, (error, result) => {
        if (error) {
            console.error('Erro ao inserir dados na tabela de currículos', error);
            res.status(500).json({ message: 'Erro ao inserir na tabela de currículos' });
        } else {
            console.log('Dados do currículo inseridos com sucesso');
            res.status(200).json({ message: 'Inserção bem-sucedida!' });
        }
    });
});

// Rota para excluir um currículo
app.delete('/delete', (req, res) => {
    const id = req.body.id;
    const sql = 'DELETE FROM curriculos WHERE id = $1';
    const values = [id];

    pool.query(sql, values, (error, result) => {
        if (error) {
            console.error('Erro ao excluir dados na tabela de currículos', error);
            res.status(500).json({ message: 'Erro ao excluir na tabela de currículos' });
        } else {
            console.log('Currículo excluído com sucesso');
            res.status(200).json({ message: 'Exclusão bem-sucedida!' });
        }
    });
});

// Rota para atualizar um currículo
app.patch('/update', (req, res) => {
    const { nome, email, telefone, formacao, profissao, experiencia } = req.body;
    const sql = 'UPDATE curriculos SET nome = $1, email = $2, telefone = $3, formacao = $4, profissao = $5, experiencia = $6 WHERE id = $7';
    const values = [nome, email, telefone, formacao, profissao, experiencia, req.body.id];

    pool.query(sql, values, (error, result) => {
        if (error) {
            console.error('Erro ao atualizar dados na tabela de currículos', error);
            res.status(500).json({ message: 'Erro ao atualizar na tabela de currículos' });
        } else {
            console.log('Dados do currículo atualizados com sucesso');
            res.status(200).json({ message: 'Atualização bem-sucedida!' });
        }
    });
});

// Rota para obter todos os currículos
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM curriculos';
    pool.query(sql, (error, result) => {
        if (error) {
            console.error('Erro ao listar dados na tabela de currículos', error);
            res.status(500).json({ message: 'Erro ao listar na tabela de currículos' });
        } else {
            console.log('Lista de currículos obtida com sucesso');
            res.status(200).json(result.rows);
        }
    });
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
