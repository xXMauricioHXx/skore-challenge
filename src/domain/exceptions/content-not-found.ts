import { CodedError } from '@/shared/coded-error';

export class ContentNotFoundError extends CodedError {
  constructor() {
    super('CONTENT_NOT_FOUND', 'Content does not exist or not found.');
  }
}
