import { ApiProperty } from "@nestjs/swagger";

export class InternalServerErrorExceptionDto {
    @ApiProperty({
        name: 'message',
        description: 'A generic message for an internal server error.',
        example: 'Internal Server Error'
    })
    message: string;

    @ApiProperty({
        name: 'statusCode',
        description: 'HTTP status code.',
        example: 500
    })
    statusCode: 500;
}