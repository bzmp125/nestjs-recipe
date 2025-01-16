import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

describe('Swagger Documentation', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, AuthModule, TasksModule],
    }).compile();

    app = moduleRef.createNestApplication();

    const documentBuilderOptions = new DocumentBuilder()
        .setTitle('NestJs Recipes - API Docs')
        .setDescription('Documentation for the NestJs Recipes API.')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, documentBuilderOptions);
    SwaggerModule.setup('docs', app, document);

    await app.init()
  });

  afterAll(async () => {
    await app.close();
  });

  it('should expose the Swagger UI at /docs', async (done) => {
    await request(app.getHttpServer())
      .get('/docs')
      .expect(200);
      
    done(); 
  });

  it('should include correct documentation for GET /tasks', async (done) => {
    const swaggerJson = await request(app.getHttpServer())
      .get('/docs-json')
      .expect(200);

    const taskEndpoint = swaggerJson.body.paths['/tasks'].get;

    expect(taskEndpoint.summary).toBe('Retrieve the user\'s tasks');
    expect(taskEndpoint.responses['200']).toBeDefined();
    expect(taskEndpoint.responses['200'].description).toBe('Successfully retrieved the list of tasks belonging to the authenticated user.');
    expect(taskEndpoint.responses['200'].content['application/json'].schema.type).toBe('array');
    done();
  });
});
