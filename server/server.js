const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3100;

const path = require('path');
const result = require('dotenv').config({ path: path.resolve(__dirname, '../server/.env.development') });

const {Pool, Client} = require('pg');
const { release } = require('os');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === 'true' ? {rejectUnauthorized: false} : false
});

app.use(cors());
app.use(express.json());

app.get("/api/title", (req, res) => {
  res.json({ title: "Wallet Wizard Project - February 2026" })
});

app.get("/api/transaction", async (req, res) => {
  let client
  try {
    client = await pool.connect();
    console.log('Got a connection from the pool');
    const resp = await client.query('SELECT t.*, c.name AS category_name FROM transaction t JOIN category c ON t.category_id = c.id where t.deleted_at IS NULL');
    res.json(resp.rows);
  } catch (err) {
    console.error(err);
    res.json({error: err});
  } finally {
    client?.release();
  }
});

app.get("/api/category", async (req, res) => {
  let client
  try{
    client = await pool.connect();
    console.log('Got a connection from the pool');
    const resp = await client.query('SELECT c.id, c.name as category_name, c.created_at FROM category as c WHERE c.deleted_at IS NULL');
    res.json(resp.rows)
  }catch{
    console.error(err)
    res.json({error: err})
  }finally{
    client?.release();
  }
});

app.get("/api/transaction/:id", async (req, res) => {
  let client
  const { id } = req.params;
  try{
    client = await pool.connect();
    console.log('Got a connection from the pool');
    const resp = await client.query('SELECT t.*, c.name AS category_name FROM transaction t JOIN category c ON t.category_id = c.id WHERE t.deleted_at IS NULL AND t.id = $1;', [id]);
    if(resp.rows.length === 0){
      return res.status(404).json({error: "Transaction not found"});
    }
    res.json(resp.rows[0]);
  }catch(err){
    res.json({error: err});
    console.log(err)
  }finally{
    client?.release();
  }
});

app.put("/api/transaction/:id", async (req, res) => {
  let client
  const { id } = req.params;
  const { name, amount, description, category_id, date } = req.body;
  try{
    client = await pool.connect();
    console.log('Got a connection from the pool');
    const resp = await client.query('UPDATE transaction SET name = $1, amount = $2, description = $3, category_id = $4, date = $5, updated_at = NOW() WHERE id = $6 RETURNING *;', [name, amount, description, category_id, date, id]);
    if(resp.rows.length === 0){
      return res.status(404).json({error: "Transaction not found"});
    }
    res.json(resp.rows[0]);
  }catch(err){
    res.json({error: err});
    console.log(err)
  }finally{
    client?.release();
  }
});

app.delete("/api/transaction/:id", async (req, res) => {
  let client
  const { id } = req.params;
  try{
    client = await pool.connect();
    console.log('Got a connection from the pool');
    const resp = await client.query('UPDATE transaction SET deleted_at = NOW() WHERE id = $1;', [id]);
    if(resp.rowCount === 0){
      return res.status(404).json({error: "Transaction not found"});
    }
    res.json({message: "Transaction deleted!" });
  }catch(err){
    res.json({error: err});
    console.log(err)
  }finally{
    client?.release();
  }
});

app.post("/api/transaction/:id", async (req, res) => {
  let client
  const { id } = req.params
  console.log(req.body)
  const { name, amount, description, category_id, date} = req.body

  try{
    client = await pool.connect()
    console.log('got a connection to the pool')
    const resp = await client.query('INSERT INTO transaction (id, name, amount, description, category_id, date, created_at, updated_at) values ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *;', [id, name, amount, description, category_id, date])
    res.json(resp.rows[0])
  }catch (err){
    res.json({error: err})
    console.log(err)
  }finally{
    client?.release()
  }
});

app.get("/api/category/:id", async (req, res) => {
  let client
  const { id } = req.params

  try{
    client = await pool.connect()
    console.log("got a connection from the pool")
    const resp = await client.query('SELECT c.id, c.name, c.created_at FROM category c WHERE deleted_at IS NULL AND c.id = $1;', [id])
    if(resp.rows.length === 0){
      return res.status(404).json({error: "Category not found"})
    }
    res.json(resp.rows[0])
  }catch(err){
    res.json({error: err})
    console.json(err)
  }finally{
    client?.release() 
  }
})

app.put("/api/category/:id", async (req, res) => {
  let client
  const { id } = req.params;
  console.log(req.body)
  const { name } = req.body
  try{
    client = await pool.connect();
    console.log('Got a connection from the pool');
    const resp = await client.query('UPDATE category SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING *;', [name, id])
    if(resp.rows.length === 0){
      return res.status(404).json({error: "Category not found"});
    }
    res.json(resp.rows[0]);
  }catch(err){
    res.json({error: err});
    console.log(err)
  }finally{
    client?.release();
  }
});

app.delete("/api/category/:id", async (req, res) => {
  let client
  const { id } = req.params;
  try{
    client = await pool.connect();
    console.log('Got a connection from the pool');
    const resp = await client.query('UPDATE category SET deleted_at = NOW() WHERE id = $1;', [id]);
    if(resp.rowCount === 0){
      return res.status(404).json({error: "Category not found"});
    }
    res.json({message: "Category deleted!" });
  }catch(err){
    res.json({error: err});
    console.log(err)
  }finally{
    client?.release();
  }
});

app.post("/api/category/:id", async (req, res) => {
  let client
  const { id } = req.params
  console.log(req.body)
  const { name } = req.body
  try{
    client = await pool.connect()
    console.log('got a connection to the pool')
    const resp = await client.query('INSERT INTO category (id, name, created_at, updated_at) values ($1, $2, NOW(), NOW()) RETURNING *;', [id, name])
    res.json(resp.rows[0])
  }catch (err){
    res.json({error: err})
    console.log(err)
  }finally{
    client?.release()
  }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});