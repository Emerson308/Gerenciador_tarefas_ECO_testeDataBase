const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { randomUUID } = require('crypto');
const pool = require('./db');
// const open = require('open');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// const DATA_PATH = path.join(__dirname, 'data', 'dados.json');


app.get('/check-login', (req, res) => {
})
app.post('/registro-cadastro', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
        res.status(400).json({ success: false, message: "As senhas não coincidem" });
        return;
    }
    try {
        const id = randomUUID();
        const result = await pool.run('INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)', [name, email, password], (err) => {
            if (err) {
                console.log('Erro ao inserir usuário', err.message);
            } else {
                res.status(201).json({ success: true, message: "Cadastro realizado!" });
            }
        });
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Erro ao salvar cadastro" });
    }
})

app.post('/login', (req, res) => {
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Porta ${PORT} já está em uso!`);
        process.exit(1);
    } else {
        throw err;
    }
});