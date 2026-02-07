// src/auth/dto/auth.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
