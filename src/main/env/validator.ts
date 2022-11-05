import { IsInt, IsNotEmpty, IsEnum, IsUrl } from 'class-validator';

export class EnvValidator {
  @IsInt()
  @IsNotEmpty()
  httpPort: number;

  @IsNotEmpty()
  httpBodyLimit: string;

  @IsNotEmpty()
  dbHost: string;

  @IsNotEmpty()
  dbClient: string;

  @IsNotEmpty()
  dbPort: number;

  @IsNotEmpty()
  dbUsername: string;

  @IsNotEmpty()
  dbPassword: string;

  @IsNotEmpty()
  dbSchema: string;

  @IsNotEmpty()
  jwtSecret: string;

  constructor(props: any) {
    Object.assign(this, props);
  }
}
