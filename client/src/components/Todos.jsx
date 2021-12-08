import React from 'react'
import TodoItem from './TodoItem'

const Todos = ({ todos, getAllTodos }) => {
	const displayTodosList = () => {
		if (todos.length) {
			return todos.map(todo => {
				return (
					<TodoItem
						id={todo.todo_id}
						key={todo.todo_id}
						description={todo.description}
						getAllTodos={getAllTodos}
					/>
				)
			})
		} else {
			return <h1>Your Todo Bucket Is Empty! </h1>
		}
	}
	return displayTodosList()
}

export default Todos
