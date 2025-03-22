import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { randomUUID } from 'crypto';
import supabase from './db.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
// import { console } from 'inspector';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));
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
            if (error.code === '23505'){
                res.status(401).json({success: false, message: 'O email inserido já foi cadastrado'});
                return;
            }
            console.log(error)
        } else {
            res.status(700).json({success: true, message: 'Cadastro realizado!'});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Erro ao salvar cadastro" });
    }
})

app.post('/login-teste', async (req, res) => {
    const { email, password} = req.body;
    try {
        const { data, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('email', email);
        if (error){
            console.log(error);
        } else{
            // console.log(data);
            if (!data[0]){
                res.status(402).json({success: false, message: "O email inserido não está cadastrado"});
                return;
            } else {
                if (data[0].senha == password){
                    res.status(701).json({success: true, message: "Login realizado!"});
                    return;
                } else {
                    res.status(403).json({success: false, message: "A senha inserida está incorreta!"});
                    return;
                }
            }
        }
    } catch (error){
        console.error(error);
        res.status(500).json({ success: false, message: "Erro ao salvar cadastro" });
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Servidor rodando em  http://localhost:${PORT}`);
})