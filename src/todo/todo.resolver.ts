import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import type { CreateTodoInput } from './dto/inputs/create-todo.input'
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

  @Mutation(() => Todo, { name: 'create to do' })
  createTodo(@Args('dataTodoACrear') createTodoInput: CreateTodoInput) {
    return this.todoService.createTodo(createTodoInput)
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
