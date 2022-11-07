import { CodedError } from '@/shared/coded-error';

export class InvalidContentTypeError extends CodedError {
  constructor() {
    super(
      'INVALID_CONTENT_TYPE',
      'The provided content type does not match with accepted contents.'
    );
  }
}
