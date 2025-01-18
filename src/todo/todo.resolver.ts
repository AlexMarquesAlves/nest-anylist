import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { Todo } from './entity/todo.entity'
import type { TodoService } from './todo.service'

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: "TO DO's" })
  findAll(): Todo[] {
    return this.todoService.findAll()
  }

  @Query(() => Todo, { name: 'To do' })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id)
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
