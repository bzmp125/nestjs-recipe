import { ApiProperty } from "@nestjs/swagger";

export class SigninOkResponseDto {
    @ApiProperty({
        name: 'accessToken',
        description: 'JWT with the username, issue and expiry date-time as the payload.',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzM2OTM0NDI2LCJleHAiOjE3MzY5MzgwMjZ9.TRQJAlmDmt3T9vVovyPhlSV-SKeLlJB7svDP2d-cZko'
    })
    accessToken: string;
}

export class SigninUnauthorizedResponseDto {
    @ApiProperty({
        name: 'message',
        description: 'The detailed description of the authentication error.',
        example: 'Please check your login credentials'
    })
    message: string;
    @ApiProperty({
        name: 'error',
        description: 'The error name.',
        example: 'Unauthorized'
    })
    error: string;
    @ApiProperty({
        name: 'statusCode',
        description: 'The HTTP status code.',
        example: 401
    })
    statusCode: number;
}
