import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  // Get a user by ID
  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(Number(id));
  }

  // Create a new user
  @Post('/')
  createUser(@Body() body: createUserDto) {
    return this.userService.createUser(body);
  }

  // Update an existing user by ID
  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() body: { username?: string; email?: string; password?: string },
  ) {
    return this.userService.updateUser(Number(id), body);
  }

  // Delete a user by ID
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}