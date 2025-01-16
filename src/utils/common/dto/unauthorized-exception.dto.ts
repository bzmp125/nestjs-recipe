import { ApiProperty } from "@nestjs/swagger";

export class UnauthorizedExceptionDto {
    @ApiProperty({
        name: 'message',
        description: 'A generic message for an internal server error.',
        example: 'Unauthorized'
    })
    message: string;

    @ApiProperty({
        name: 'statusCode',
        description: 'HTTP status code.',
        example: 401
    })
    statusCode: 401;
}