import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
  ) {}

  // Create a new task
  createTask(taskData: Partial<Task>) {
    const task = this.tasksRepo.create(taskData);
    return this.tasksRepo.save(task);
  }
   getAllTasks() {
    return this.tasksRepo.find({ relations: ['user'] });
  }
  // Get all tasks
  findAll() {
    return this.tasksRepo.find({ relations: ['user'] });
  }

  // Get a task by ID
  getTask(id: number) {
    return this.tasksRepo.findOne({ where: { id }, relations: ['user'] });
  }

  // Update a task
  async updateTask(id: number, updateData: Partial<Task>) {
    await this.tasksRepo.update(id, updateData);
    return this.getTask(id);
  }

  // Delete a task
  deleteTask(id: number) {
    return this.tasksRepo.delete(id);
  }

  // Optional: find tasks by user
  findByUser(userId: number) {
    return this.tasksRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}