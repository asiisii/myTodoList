import React, { useState } from 'react'
import EditTodo from './EditTodo'

const TodoItem = ({ id, description, getAllTodos }) => {
	const [show, setShow] = useState(false)

	const showEditModal = e => {
		setShow(prevShow => !prevShow)
	}

	const deleteTodo = async e => {
		e.preventDefault()
		await fetch(`/todos/${id}`, {
			method: 'DELETE',
		})
		getAllTodos()
	}

	return (
		<div className='todoItem-wrapper' id={id}>
			<h3>{description}</h3>
			<button className='toggle-button' id={id} onClick={e => showEditModal(e)}>
				Edit
			</button>
			<EditTodo
				showEditModal={showEditModal}
				show={show}
				id={id}
				description={description}
				getAllTodos={getAllTodos}
			/>
			<button onClick={e => deleteTodo(e)}>Delete</button>
		</div>
	)
}

export default TodoItem
