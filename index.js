const express = require('express');
const app = express();
const PORT = 3000;

// Load the .env file configurations
require('dotenv').config();

// Middleware?
// app.use(cors())
app.use(express.json())

// Supabase setup
const { createClient } = require('@supabase/supabase-js')
const supabaseURL = process.env.SUPABASE_URL
const supabaseAPI = process.env.SUPABASE_API
const supabase = createClient(supabaseURL, supabaseAPI)


const printAndReturnBool = (err) => {
    if (!err) return false;
    console.log(`Error: ${err}`)
    return true;
}

const fetchAUserFromSupabase = async () => {
    const { data, error } = await supabase.from('users').select('user_id, name')
    if (printAndReturnBool(error)) return;
    return data
}

// Create a simple get route
app.get('/', (req, res) => {
    res.status(200).send('HELLO, this is express')
})

app.get('/getapi/', (req, res) => {
    res.status(200).send(`supabaseURL = ${supabaseURL}\n
    supabaseAPI = ${supabaseAPI}`
)})


app.get('/getauser/', (req, res) => {
    const user = fetchAUserFromSupabase()
    res.status(200).send(user)
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})