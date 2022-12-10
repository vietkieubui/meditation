import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './common/guards';

const HOST = process.env.IP_ADDRESS;
const PORT = 3001;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true }));
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  await app.listen(PORT, HOST, () => {
    console.log(`Listening on http://${HOST}:${PORT}`);
    console.log(`Graphql running on http://${HOST}:${PORT}/graphql`);
  });
}
bootstrap();
