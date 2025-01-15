import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskBadRequestDto {
    @ApiProperty({
        name: 'message',
        description: 'An array of validation error messages',
        example: [
            "title should not be empty",
            "description should not be empty"
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