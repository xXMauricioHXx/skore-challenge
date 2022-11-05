import { Unauthorized } from '@/presentation/http/exceptions/unautorized';

export class AuthenticationError extends Unauthorized {
  constructor() {
    super('AUTHENTICATION_FAILED', 'Authentication failed.');
  }
}
