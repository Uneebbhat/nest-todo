import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly databasaeService: DatabaseService) {}

  async createTodo(createTodo: CreateTodoDto) {
    const newTodo = await this.databasaeService.todo.create({
      data: {
        title: createTodo.title,
        userId: createTodo.userId,
      },
    });

    if (!newTodo) {
      throw new NotFoundException('Error creating new todo');
    }

    return newTodo;
  }

  async getAllTodo(user: { connect: { id: number } }) {
    const todos = await this.databasaeService.todo.findMany({
      where: { userId: user.connect.id },
    });
    if (!todos || todos.length === 0) {
      throw new NotFoundException('No todo found');
    }
    return todos;
  }
}
