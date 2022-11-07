import { InvalidContentTypeError } from '@/domain/exceptions/invalid-content-type';

export enum ContentType {
  VIDEO = 'video',
  PDF = 'pdf',
  IMAGE = 'image',
}

export class Content {
  public readonly name: string;
  public readonly description: string;
  public readonly type: ContentType;

  constructor(props: Partial<Content>) {
    Object.assign(this, props);
  }

  assertValidContentType() {
    if (
      this.type !== ContentType.VIDEO &&
      this.type !== ContentType.IMAGE &&
      this.type !== ContentType.PDF
    ) {
      throw new InvalidContentTypeError();
    }
  }
}
