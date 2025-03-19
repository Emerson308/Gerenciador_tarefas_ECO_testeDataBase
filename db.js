// require('dotenv').config();
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config();


const supabaseUrl = 'https://uufxkxhgxrriyepnmdwo.supabase.co'
const supabaseKey = process.env.DATABASE_URL
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;

// const {data, error} = await supabase
//     .from('usuarios')
//     .select()

// if (error){
//     console.log(error)
// }

// console.log(data);


// module.exports = supabase;