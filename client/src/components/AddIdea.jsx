import React, { useState } from 'react'

const AddIdea = ({ getAllTodos }) => {
	const [description, setDescription] = useState('')

	const addTodo = async e => {
		e.preventDefault()
		try {
			await fetch('http://localhost:5000/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ description }),
			})
			getAllTodos()
			clearInputs()
		} catch (error) {
			console.error(error.message)
		}
	}

	const clearInputs = () => setDescription('')

	return (
		<form onSubmit={e => addTodo(e)}>
			<input
				type='text'
				placeholder='Add todo item...'
				value={description}
				onChange={e => setDescription(e.target.value)}
			/>
		</form>
	)
}

export default AddIdea
