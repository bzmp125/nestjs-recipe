import { ApiProperty } from "@nestjs/swagger";

export class TaskNotFoundResponseDto {
    @ApiProperty({
        name: 'message',
        description: '',
        example: `Task with ID "26adbdc9-441a-4cc4-bf0f-47bb725b0e44" not found`
    })
    message: string;

    @ApiProperty({
        name: 'error',
        description: 'The error name',
        example: 'Not Found'
    })
    error: string;

    @ApiProperty({
        name: 'statusCode',
        description: 'The HTTP status code.',
        example: 404
    })
    statusCode: 404;
}
