import jwt from 'jsonwebtoken';
import { singleton } from 'tsyringe';
import { env } from '@/main/env';
import { User } from '@/domain/entities/user';
import { HttpRequest } from '@/presentation/http/ports/http';
import { Middleware } from '@/presentation/http/ports/middleware';
import { AuthenticationError } from '@/presentation/http/exceptions/authentication-error';

@singleton()
export class AuthenticationMiddleware implements Middleware {
  async handle(req: HttpRequest) {
    const userInfo = req.headers['authorization'] as string;

    if (!userInfo || !userInfo.startsWith('Bearer ')) {
      throw new AuthenticationError();
    }

    const replacedUserInfo = userInfo.replace('Bearer ', '');

    try {
      const decodedToken = await jwt.verify(replacedUserInfo, env.jwtSecret);
      const { levelPermission, id } = decodedToken as Partial<User>;

      req.user = new User({
        id,
        levelPermission,
      });
    } catch (err) {
      throw new AuthenticationError();
    }
  }
}
