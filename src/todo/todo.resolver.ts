import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import type { CreateTodoInput, UpdateTodoInput } from './dto/inputs'
import { Todo } from './entity/todo.entity'
import type { TodoService } from './todo.service'

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: "TO DO's" })
  findAll() //? @Args('limit', { type: () => Int }) limit: number,
  //? @Args('offset', { type: () => Int }) offset: number
  : Todo[] {
    return this.todoService.findAll()
  }

  @Query(() => Todo, { name: 'To do' })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id)
  }

  @Mutation(() => Todo, { name: 'create to do' })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.createTodo(createTodoInput)
  }

  @Mutation(() => Todo, { name: 'update to do' })
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.updateTodo(updateTodoInput.id, updateTodoInput)
  }

  @Mutation(() => Boolean, { name: 'remove to do' })
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.removeTodo(id)
  }
}
