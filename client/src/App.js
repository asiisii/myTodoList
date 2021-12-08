import React, { useState, useEffect } from 'react'
import AddIdea from './components/AddIdea'
import Todos from './components/Todos'
import './App.css'

function App() {
	const [todos, setTodos] = useState([])

	useEffect(() => {
		getAllTodos()
	}, [])

	const getAllTodos = async () => {
		const response = await fetch('http://localhost:5000/todos')
		const todoList = await response.json()
		setTodos(todoList)
	}

	return (
		<React.Fragment>
			<AddIdea getAllTodos={getAllTodos} />
			<Todos todos={todos} getAllTodos={getAllTodos} />
		</React.Fragment>
	)
}

export default App
