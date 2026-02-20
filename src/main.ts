import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局 ValidationPipe（用于做字段校验）（强烈推荐全局开启）
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,                // 剔除 DTO 未定义的字段
      forbidNonWhitelisted: true,     // 有未定义字段 → 报 400
      transform: true,                // 必须！把 plain object 转成 DTO class 实例
      // 下面可选：更友好的错误格式
      // exceptionFactory: (errors) => {
      //   const messages = errors.map(error => ({
      //     property: error.property,
      //     constraints: error.constraints,
      //   }));
      //   return new BadRequestException(messages);
      // },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
