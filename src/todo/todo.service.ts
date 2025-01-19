import { Injectable, NotFoundException } from '@nestjs/common'
import type { CreateTodoInput, UpdateTodoInput } from './dto/inputs'
import { Todo } from './entity/todo.entity'

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Gema del alma', done: false },
    { id: 2, description: 'Gema del espacio', done: true },
    { id: 3, description: 'Gema del poder', done: false },
    // {id: 4, description: 'Gema del tiempo', done: false},
    // {id: 5, description: 'Gema de la realidad', done: false},
    // {id: 6, description: 'Gema de la mente', done: false}
  ]

  findAll(): Todo[] {
    return this.todos
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id)

    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`)

    return todo
  }

  createTodo(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo()
    todo.description = createTodoInput.description
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1

    this.todos.push(todo)
    return todo
  }

  updateTodo(updateTodoInput: UpdateTodoInput): Todo {
    throw new Error('Method not implemented.')
  }

  removeTodo() {
    throw new Error('Method not implemented.')
  }
}
