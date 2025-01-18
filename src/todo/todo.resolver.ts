import { Query, Resolver } from '@nestjs/graphql'
import { Todo } from './entity/todo.entity'
import type { TodoService } from './todo.service'

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'TODOs' })
  findAll(): Todo[] {
    return this.todoService.findAll()
  }

  @Query(() => [String])
  findOne() {
    return this.todoService.findOne()
  }

  @Query(() => [String])
  createTodo() {
    return this.todoService.createTodo()
  }

  @Query(() => [String])
  updateTodo() {
    return this.todoService.updateTodo()
  }

  @Query(() => [String])
  removeTodo() {
    return this.todoService.removeTodo()
  }
}
