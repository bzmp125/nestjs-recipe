import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "../task-status.enum";

export class TaskDto {
    @ApiProperty({
        name: 'id',
        description: 'The ID of the task',
        example: '938447d1-9a94-473d-96a0-72c403aa9102'
    })
    id: string;

    @ApiProperty({
        name: 'title',
        description: 'The title of the task',
        example: 'Cook dinner!'
    })
    title: string;

    @ApiProperty({
        name: 'description',
        description: 'The description of the task',
        example: 'Prepare for the 6PM dinner with the in-laws.'
    })
    description: string;

    @ApiProperty({
        name: 'status',
        description: 'The status of the task',
        enum: TaskStatus,
        example: TaskStatus.OPEN
    })
    status: TaskStatus;
}

export type TasksDto = TaskDto[]