import { ApiProperty } from "@nestjs/swagger";

export class UpdateTaskStatusBadRequestResponseDto {
    @ApiProperty({
        name: 'message',
        description: 'An array of validation error messages',
        example: [
            "status must be a valid enum value"
        ]
    })
    message: string[];

    @ApiProperty({
        name: 'error',
        description: 'The error name.',
        example: 'Bad Request'
    })
    error: string;

    @ApiProperty({
        name: 'statusCode',
        description: 'The HTTP status code.',
        example: 400
    })
    statusCode: 400;

}