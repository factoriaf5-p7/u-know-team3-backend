import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	
	// Configuración de SWAGGER
	const options = new DocumentBuilder()
		.setTitle('U-Know platform API')
		.setDescription('Documentation of U-Know platform API')
		.setVersion('0.1')
		.build();
	const document = SwaggerModule.createDocument(app, options);

	// Configuración del ENDPOINT de la documentación de la API en /docs
	SwaggerModule.setup('docs', app, document);

	await app.listen(3000);
}
bootstrap();
