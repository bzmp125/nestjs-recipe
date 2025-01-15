import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    name: 'title',
    description: 'Title of the task',
    example: 'New Task'
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'description',
    description: 'Description of the task',
    example: 'Task Description'
  })
  @IsNotEmpty()
  description: string;
}
