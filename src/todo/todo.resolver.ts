import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class TodoResolver {
  @Query(() => [String], { name: 'TODOs' })
  findAll() {
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
