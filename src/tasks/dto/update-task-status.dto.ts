import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @ApiProperty({
    name: 'status',
    description: 'New status of the task.',
    enum: TaskStatus,
    examples: Object.values(TaskStatus),
    example: TaskStatus.DONE
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
