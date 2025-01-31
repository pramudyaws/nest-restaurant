import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function initializeSwagger(app: INestApplication<any>) {
    const apiVersion = '1.0.0';
    const config = new DocumentBuilder()
        .setTitle(`Nest Restaurant API`)
        .setDescription(`API Documentation v${apiVersion}`)
        .setVersion(apiVersion)
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs/v1', app, document, {
        swaggerOptions: { defaultModelsExpandDepth: -1, tagsSorter: 'alpha' },
    });
}
