// const supabase = require('./db');
import supabase from './db.js';

async function getData() {
    const {data, error} = await supabase.from('usuarios').select('*')

    console.log(data)
}

getData()