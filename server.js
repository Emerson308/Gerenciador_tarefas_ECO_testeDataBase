import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { randomUUID } from 'crypto';
import supabase from './db.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
        const { error } = await supabase
            .from('usuarios')
            .insert({nome: name, email: email, senha: 1234});
        if (error){
            console.log(error)
        }

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