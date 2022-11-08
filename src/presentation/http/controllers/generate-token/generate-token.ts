import jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';
import { env } from '@/main/env';
import { post, schema } from '@/shared/decorators';
import { UserLevelPermission } from '@/domain/entities/user';
import { generateTokenSchema } from '@/presentation/http/controllers/generate-token/generate-token.schema';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/http/ports';

@injectable()
@post('/generate-token')
export class GenerateTokenController extends Controller {
  @schema(generateTokenSchema)
  async handle(
    req: HttpRequest
  ): Promise<HttpResponse<GenerateTokenController.Response>> {
    const data = req.body as GenerateTokenController.Request;

    const token = jwt.sign(data, env.jwtSecret);

    return { data: { token } };
  }

  exception(error: Error): Error {
    return error;
  }
}

export namespace GenerateTokenController {
  export type Request = {
    id: number;
    name: string;
    email: string;
    levelPermission: UserLevelPermission;
  };

  export type Response = {
    token: string;
  };
}
