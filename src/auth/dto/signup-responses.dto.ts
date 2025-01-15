import { ApiProperty } from "@nestjs/swagger";

export class SignupBadRequestResponseDto {
    @ApiProperty({
        name: 'message',
        description: 'An array of validation error messages',
        example: [
            "username must be shorter than or equal to 20 characters"
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

export class SignupConflictResponseDto {
    @ApiProperty({
        name: 'message',
        description: 'The detailed description of the authentication error.',
        example: 'Username already exists'
    })
    message: string;

    @ApiProperty({
        name: 'error',
        description: 'The error name.',
        example: 'Conflict'
    })
    error: string;

    @ApiProperty({
        name: 'statusCode',
        description: 'The HTTP status code.',
        example: 409
    })
    statusCode: 409;
}