import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/react-apps'

export default class Todo extends Component {
	constructor(props) {
		super(props)
		this.state = { description: '', list: [] }

		this.handleChange= this.handleChange.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
		this.handleRemove = this.handleRemove.bind(this)
		this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
		this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.handleClear = this.handleClear.bind(this)

		this.refresh()
	}

	refresh(description = '') {
		const search = description ? `&description__regex=/${description}/` : ''
		axios.get(`${URL}?sort=-createdAt${search}`)
			.then(resp => this.setState({...this.state, description, list: resp.data}))
	}

	handleChange(e) {
		this.setState({...this.state, description: e.target.value})
	}

	handleAdd() {
		const description = this.state.description
		axios.post(URL, { description })
			.then(resp => this.refresh())
	}

	handleRemove(task) {
		axios.delete(`${URL}/${task._id}`)
			.then(resp => this.refresh(this.state.description))
	}

	handleMarkAsDone(task) {
		axios.put(`${URL}/${task._id}`, { ...task, done: true })
			.then(resp => this.refresh(this.state.description))
	}

	handleMarkAsPending(task) {
		axios.put(`${URL}/${task._id}`, { ...task, done: false })
			.then(resp => this.refresh(this.state.description))
	}

	handleSearch() {
		this.refresh(this.state.description)
	}

	handleClear() {
		this.refresh()
	}

	render() {
		return (
			<div>
				<PageHeader name='Tarefas' small='Cadastro'></PageHeader>
				<TodoForm description={this.state.description}
									handleAdd={this.handleAdd}
									handleChange={this.handleChange}
									handleSearch={this.handleSearch}
									handleClear={this.handleClear} />

				<TodoList list={this.state.list}
									handleMarkAsPending = {this.handleMarkAsPending}
									handleMarkAsDone = {this.handleMarkAsDone}
									handleRemove = {this.handleRemove} />
			</div>
		)
	}
}