import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  // Get all tasks
  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  // Get a single task by ID
  @Get('/:id')
  getTask(@Param('id') id: string) {
    return this.taskService.getTask(Number(id));
  }

  // Create a new task
  @Post('/')
  createTask(@Body() body: any) {
    return this.taskService.createTask(body);
  }

  // Mark task as done
  @Patch('/:id/done')
  markTaskAsDone(@Param('id') id: string, @Body() body: any) {
    return this.taskService.updateTask(Number(id), { ...body, status: 'done' });
  }

  // Mark task as pending
  @Patch('/:id/pending')
  markTaskAsPending(@Param('id') id: string, @Body() body: any) {
    return this.taskService.updateTask(Number(id), { ...body, status: 'pending' });
  }

  // Delete a task by ID
  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(Number(id));
  }
}