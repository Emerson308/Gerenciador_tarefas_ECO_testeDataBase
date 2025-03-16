require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(process.env.DATABASE_URL, (err) => {
    if (err) {
        console.log('Erro ao conectar com o banco de dados', err);
    } else {
        console.log('Banco de dados conectado');
    }
});

module.exports = db;