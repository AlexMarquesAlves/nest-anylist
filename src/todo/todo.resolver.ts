import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import type { CreateTodoInput, StatusArgs, UpdateTodoInput } from './dto'
import { Todo } from './entity/todo.entity'
import type { TodoService } from './todo.service'

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: "TO DO's" })
  findAll(
    //? @Args('limit', { type: () => Int }) limit: number,
    //? @Args('offset', { type: () => Int }) offset: number
    @Args() statusArgs: StatusArgs
  ): Todo[] {
    return this.todoService.findAll(statusArgs)
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

  // ? Aggregation
  @Query(() => Int, { name: "total to do's" })
  totalTodos(): number {
    return this.todoService.totalTodos
  }

  // * Completed Todos
  @Query(() => Int, { name: "total completed to do's" })
  totalCompletedTodos(): number {
    return this.todoService.totalDoneTodos
  }

  // * Pending Todos
  @Query(() => Int, { name: "total pending to do's" })
  totalPendingTodos(): number {
    return this.todoService.totalUndoneTodos
  }
}
