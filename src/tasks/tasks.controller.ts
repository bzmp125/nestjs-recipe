import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { Logger } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InternalServerErrorExceptionDto } from 'src/utils/common/dto/internal-server-error-exception.dto';
import { TaskDto } from './dto/task.dto';
import { TaskNotFoundResponseDto } from './dto/get-tasks-responses.dto';
import { CreateTaskBadRequestDto } from './dto/create-task-responses.dto';
import { UpdateTaskStatusBadRequestResponseDto } from './dto/update-task-responses.dto';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED, 
  description: 'The access token in the Authorization header is invalid.',
})
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(private tasksService: TasksService) {}

  @ApiOperation({
    summary: 'Retrieve the user\'s tasks', 
    description: 'This endpoint retrieves the tasks of the authenticated user.',
  })
  @ApiResponse({
    status: HttpStatus.OK, 
    description: 'Successfully retrieved the list of tasks belonging to the authenticated user.',
    type: [TaskDto]
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, 
    description: 'Something wrong happened. Please try again.',
    type: InternalServerErrorExceptionDto
  })
  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<TaskDto[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  @ApiOperation({
    summary: 'Retrieve a user\'s task by ID', 
    description: 'This endpoint retrieves a task which belongs to the authenticated user by it\'s ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK, 
    description: 'Successfully retrieved the task by ID belonging to the authenticated user.',
    type: TaskDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND, 
    description: 'Task not found.',
    type: TaskNotFoundResponseDto
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, 
    description: 'Something wrong happened. Please try again.',
    type: InternalServerErrorExceptionDto
  })
  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<TaskDto> {
    return this.tasksService.getTaskById(id, user);
  }

  @ApiOperation({
    summary: 'Create a task', 
    description: 'This endpoint creates a task and saves it under the authenticated user.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED, 
    description: 'The task was created successfully under the authenticated user.',
    type: TaskDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST, 
    description: 'The task validation failed, check the response for the error.',
    type: CreateTaskBadRequestDto
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, 
    description: 'Something wrong happened. Please try again.',
    type: InternalServerErrorExceptionDto
  })
  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<TaskDto> {
    this.logger.verbose(
      `User "${user.username}" creating a new task. Data: ${JSON.stringify(
        createTaskDto,
      )}`,
    );
    return this.tasksService.createTask(createTaskDto, user);
  }

  @ApiOperation({
    summary: 'Delete a user\'s task by ID', 
    description: 'This endpoint deletes a task which belongs to the authenticated user by it\'s ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK, 
    description: 'The task was successfully deleted.'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND, 
    description: 'Task not found.',
    type: TaskNotFoundResponseDto
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, 
    description: 'Something wrong happened. Please try again.',
    type: InternalServerErrorExceptionDto
  })
  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @ApiOperation({
    summary: 'Update a task\'s status by ID', 
    description: 'This endpoint updates the status of a task which belongs to the authenticated user by it\'s ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK, 
    description: 'The task status was successfully updated.',
    type: TaskDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND, 
    description: 'Task not found.',
    type: TaskNotFoundResponseDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST, 
    description: 'The task status validation failed, check the response for the error.',
    type: UpdateTaskStatusBadRequestResponseDto
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR, 
    description: 'Something wrong happened. Please try again.',
    type: InternalServerErrorExceptionDto
  })
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<TaskDto> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
