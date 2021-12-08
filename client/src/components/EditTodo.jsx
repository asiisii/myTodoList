import React, { useState } from 'react'

const EditTodo = ({ showEditModal, show, id, description, getAllTodos }) => {
	const [todoInfo, setTodoInfo] = useState(description)

	const closeEditModal = () => {
		showEditModal()
	}

	const handleChange = e => {
		setTodoInfo(e.target.value)
	}

	const updateTodo = async e => {
		e.preventDefault()
		await fetch(`http://localhost:5000/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ description: todoInfo }),
		})
		closeEditModal()
		getAllTodos()
	}

	if (!show) {
		return null
	}
	return (
		<div className='modal' id={id}>
			<div className='modal-header'>
				<h2>Edit Todo</h2>
				<a className='close-button' onClick={closeEditModal}>
					&times;
				</a>
			</div>
			<div className='item'>
				<input
					className='description'
					type='text'
					value={todoInfo}
					onChange={e => handleChange(e)}
				/>
			</div>
			<div className='button-container'>
				<a className='save-button' onClick={e => updateTodo(e)}>
					Save
				</a>
			</div>
		</div>
	)
}

export default EditTodo
