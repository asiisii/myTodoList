const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const path = require('path')
const PORT = process.env.PORT || 5000

//middleware
app.use(cors()) //this lets our local 5000 and 3000 to interact with each other
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
}

app.get('/todos', async (req, res) => {
	try {
		const allTodos = await pool.query('SELECT * FROM todo')

		res.json(allTodos.rows)
	} catch (error) {
		console.error(error.message)
	}
})

app.get('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params
		const aTodo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
			id,
		])

		res.json(aTodo.rows[0])
	} catch (error) {
		console.error(error.message)
	}
})

app.post('/todos', async (req, res) => {
	try {
		const { description } = req.body
		const newTodo = await pool.query(
			'INSERT INTO todo (description) VALUES ($1)',
			[description]
		)

		res.json('Created a todo successfully')
	} catch (error) {
		console.error(error.message)
	}
})

app.put('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params
		const { description } = req.body
		const updatedTodo = await pool.query(
			'UPDATE todo SET description = $1 WHERE todo_id = $2',
			[description, id]
		)

		res.json('Updated successfully')
	} catch (error) {
		console.error(error.message)
	}
})

app.delete('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params
		const deletedTodo = await pool.query(
			'DELETE FROM todo WHERE todo_id = $1',
			[id]
		)

		res.json('Deleted successfully')
	} catch (error) {
		console.error(error.message)
	}
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`))
